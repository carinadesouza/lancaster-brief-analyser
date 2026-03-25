import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are an expert academic analyst. A student will upload their assignment brief and you must read it carefully and extract EVERYTHING that is relevant for a student trying to complete it.

Your job is to produce a structured JSON output where EVERY field is derived directly from the assignment text. Never invent, assume, or add generic advice. If something is not in the document, do not include it.

The output structure must be dynamic — only include sections that are actually relevant to THIS assignment.

Return ONLY a valid JSON object with this structure:

{
  "module": "exact module code and full name from the document",
  "author": "lecturer name if present, else null",
  "deadline": "exact deadline if mentioned, else null",
  "overview": "3-4 sentences describing exactly what this assignment asks the student to do — be specific to this document",
  
  "tasks": [
    {
      "id": "Task 1",
      "title": "exact task title from the document",
      "description": "detailed explanation of what this task requires — pulled from the document",
      "subtasks": [
        {
          "title": "subtask or requirement title",
          "description": "what exactly needs to be done for this subtask"
        }
      ],
      "deliverables": ["exact deliverable for this task"],
      "estimatedHours": <realistic number of hours a student would need for this task, must be a positive integer greater than 0>
    }
  ],

  "submissionRequirements": [
    {
      "label": "requirement name e.g. Format, Word limit, Platform",
      "value": "exact value from document"
    }
  ],

  "markingCriteria": [
    {
      "name": "exact criterion name",
      "weight": <percentage as number or null if not given>,
      "description": "what this criterion assesses based on the document"
    }
  ],

  "suggestedStructure": [
    {
      "section": "section title relevant to this assignment",
      "purpose": "what this section should contain based on the assignment requirements",
      "estimatedLength": "e.g. ~300 words or ~2 pages or null"
    }
  ],

  "keyInsights": [
    {
      "type": "warning | tip | requirement | note",
      "text": "specific insight derived directly from the assignment text"
    }
  ],

  "technicalRequirements": ["only include if the assignment specifies tools, languages, datasets, platforms — else omit this field"],

  "totalEstimatedHours": <sum of all task hours>,
  
  "complexityScore": <1-10>,
  "complexityReason": "one sentence explaining the score based on the actual assignment content"
}

RULES:
- Every word in your output must be traceable back to the assignment document
- Tasks and subtasks must match the actual structure of the assignment — do not invent task names
- If marking criteria percentages are not given, set weight to null
- submissionRequirements should only include things explicitly stated (format, word count, platform, deadline, group size etc.)
- keyInsights should highlight things students commonly miss or misunderstand — based on THIS document
- technicalRequirements: only include if the assignment explicitly mentions tools, languages, software, datasets
- estimatedHours must be a positive integer greater than 0 for every single task, never null or 0
- totalEstimatedHours must equal the exact sum of all task estimatedHours values
- Return ONLY valid JSON, no markdown fences, no explanation`

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== 'string' || text.trim().length < 50) {
      return NextResponse.json(
        { error: 'Please provide a valid assignment brief.' },
        { status: 400 }
      )
    }

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Read this assignment brief carefully and extract every task, requirement, criterion, and detail directly from the text. Your output must reflect exactly what is written — nothing more, nothing less.\n\nASSIGNMENT:\n\n${text}`
        },
      ],
      temperature: 0.1,
      max_tokens: 4000,
    })

    const raw = response.choices[0]?.message?.content || ''
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')

    const parsed = JSON.parse(jsonMatch[0])
    return NextResponse.json(parsed)

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    )
  }
}

