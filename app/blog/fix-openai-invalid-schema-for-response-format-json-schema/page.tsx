import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import BlogLayout from '@/components/blog/BlogLayout';
import EmbeddedTool from '@/components/EmbeddedTool';
import { JsonFormatter } from '@/components/Tools';
import { blogPosts } from '@/lib/blog';

const seoPost = blogPosts.find((post) => post.slug === 'fix-openai-invalid-schema-for-response-format-json-schema')!;

export const metadata: Metadata = pageMetadata({
  title: seoPost.title, description: seoPost.excerpt, path: '/blog/fix-openai-invalid-schema-for-response-format-json-schema',
  article: { published: seoPost.date, modified: seoPost.modified, author: seoPost.author, tags: seoPost.tags },
});

export default function Page() {
  const post = blogPosts.find((p) => p.slug === 'fix-openai-invalid-schema-for-response-format-json-schema')!;

  return (
    <BlogLayout post={post}>
      <h2>1. The Problem: OpenAI Structured Outputs 400 Bad Request</h2>
      <p>
        When migrating applications to OpenAI Structured Outputs (<code>response_format: &#123; type: &quot;json_schema&quot;, ... &#125;</code>), developers frequently encounter a blocking 400 HTTP exception:
      </p>
      <pre><code>{`openai.BadRequestError: Error code: 400 - {
  "error": {
    "message": "Invalid schema for response_format 'json_schema': In context='', 'additionalProperties' is required to be supplied and to be false",
    "type": "invalid_request_error",
    "param": "response_format",
    "code": null
  }
}`}</code></pre>
      <p>
        OpenAI&apos;s constrained sampling engine uses a context-free grammar (CFG) compiler to guarantee 100% adherence to your JSON schema. However, for the compiler to work, your schema must adhere to a strict subset of JSON Schema Draft 7.
      </p>

      {/* Embedded Live Tool */}
      <EmbeddedTool
        toolSlug="json-formatter"
        headline="Validate & Inspect Your JSON Schema Locally"
        description="Paste your generated JSON Schema below to verify structural formatting and ensure all required fields and properties are syntactically sound."
      >
        <JsonFormatter />
      </EmbeddedTool>

      <h2>2. Three Mandatory Rules for OpenAI Structured Outputs</h2>
      <p>
        Unlike standard JSON Schema validation tools, OpenAI&apos;s schema engine enforces three non-negotiable constraints when <code>strict: true</code> is activated:
      </p>
      <ol>
        <li>
          <strong><code>additionalProperties: false</code> Must Be Present on ALL Objects:</strong> Every object definition in the schema tree (including nested sub-objects) must explicitly specify <code>&quot;additionalProperties&quot;: false</code>.
        </li>
        <li>
          <strong>ALL Properties Must Be Declared in <code>required</code>:</strong> In standard JSON Schema, omitting a key from <code>required</code> makes it optional. In OpenAI strict mode, <em>all</em> declared keys must be listed in the <code>required</code> array. If a field is optional, its type must be declared as a union with <code>null</code> (e.g., <code>[&quot;string&quot;, &quot;null&quot;]</code>).
        </li>
        <li>
          <strong>Unsupported Keywords:</strong> Keywords such as <code>patternProperties</code>, <code>minProperties</code>, <code>maxProperties</code>, and <code>format</code> (except for a few like <code>date-time</code>) will trigger instant 400 validation rejections.
        </li>
      </ol>

      <h2>3. Resolving with Python and Pydantic v2</h2>
      <p>
        If you are generating schemas dynamically using Pydantic in Python, configure your model with <code>extra=&apos;forbid&apos;</code> and handle optionals using <code>Optional[T] = None</code>:
      </p>
      <pre><code>{`from typing import Optional, List
from pydantic import BaseModel, ConfigDict
from openai import OpenAI

class StepAction(BaseModel):
    model_config = ConfigDict(extra="forbid")
    step_number: int
    instruction: str
    target_tool: Optional[str] = None  # Union with null for optionality

class ExecutionPlan(BaseModel):
    model_config = ConfigDict(extra="forbid")
    plan_name: str
    steps: List[StepAction]

client = OpenAI()

completion = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[
        {"role": "system", "content": "Generate a step-by-step developer workflow."},
        {"role": "user", "content": "How do I securely decode a JWT in browser memory?"}
    ],
    response_format=ExecutionPlan,
)

plan = completion.choices[0].message.parsed
print(plan.plan_name)`}</code></pre>

      <h2>4. Resolving with TypeScript and Zod / OpenAI SDK</h2>
      <p>
        In Node.js or Next.js edge runtimes, use the official <code>zodResponseFormat</code> helper from the <code>openai/helpers/zod</code> package:
      </p>
      <pre><code>{`import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const openai = new OpenAI();

const SecurityAuditSchema = z.object({
  vulnerabilityType: z.string(),
  cweId: z.number(),
  // For optional fields in strict schema mode, use nullable():
  remediationSnippet: z.string().nullable(),
  isExploitableRemotely: z.boolean(),
});

async function runSecurityAudit(sourceCode: string) {
  const response = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-2024-08-06',
    messages: [
      { role: 'system', content: 'Analyze code for cryptographic vulnerabilities.' },
      { role: 'user', content: sourceCode },
    ],
    response_format: zodResponseFormat(SecurityAuditSchema, 'audit_report'),
  });

  return response.choices[0].message.parsed;
}`}</code></pre>

      <h2>5. Schema Debugging Checklist</h2>
      <ul>
        <li>Does every object have <code>&quot;additionalProperties&quot;: false</code>?</li>
        <li>Are all property names in the object explicitly included in <code>&quot;required&quot;</code>?</li>
        <li>Are optional values typed as nullable (<code>type: [&quot;string&quot;, &quot;null&quot;]</code>)?</li>
        <li>Have you removed arbitrary constraints like regex patterns that CFG compilers cannot enforce?</li>
      </ul>
      <p>
        Verify your JSON schemas before runtime by checking syntax in our client-side <a href="/tools/json-formatter/">JSON Formatter &amp; Validator</a>.
      </p>
    </BlogLayout>
  );
}
