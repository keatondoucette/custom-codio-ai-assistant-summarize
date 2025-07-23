(async function(codioIDE, window) {
  const coachAPI = codioIDE.coachBot;

  // === Register the Main Menu Button ===
  coachAPI.register("summarizeTask", "📋 Summarize what I need to do", summarizeTask);

  // === Summarizer using Guide Page content ===
  async function summarizeTask() {
    // collects all available context
    const context = await coachAPI.getContext();
    console.log(`context -> `, context)
    // collects all page content
    const guideContent = context.guidesPage?.content || "No guide page content available.";
    console.log(`guide content -> `, guideContent)

    // System prompt for the summarizer
    const systemPrompt = `You are an assistant helping first-year students understand their Java programming assignments.

    Your job is to:
    - Read the assignment carefully.
    - Provide a short, beginner-friendly summary of what the student is being asked to do (1–2 sentences).
    - List the specific requirements the student must meet — especially those needed to pass test cases.

    Assume the student is new to programming, so keep your language clear and non-technical.

    Respond with:
    Summary: <short summary here>
    Requirements: <bulleted list of must-do items>

    Do NOT:
    - Include any code
    - Provide solutions
    - Use XML tags
    - Ask follow-up questions

    If the assignment content is missing or unclear, respond with:
    Nothing to summarize.`;

    // User prompt for the summarizer
    const userPrompt = `Here are the instructions for the assignment:

<assignment>
${guideContent}
</assignment>

Phrase your explanation directly addressing the student as 'you'.`;

    await coachAPI.ask({
      systemPrompt,
      messages: [{ role: "user", content: userPrompt }]
    });
  }

})(window.codioIDE, window);