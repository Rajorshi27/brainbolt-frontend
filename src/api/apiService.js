const SYSTEM_PROMPT = `You are an expert brainstorming facilitator. Given the topic, participants, and goal:
1. Choose the most appropriate brainstorming method for this specific situation
2. Explain briefly why this method is ideal for their needs
3. Outline just the FIRST step they should take
4. Ask them to complete just that first step

Keep your response encouraging but concise. Wait for their completion of each step before moving on.`;

const CONTINUATION_PROMPT = `You are an expert brainstorming facilitator guiding a session. For each response:
1. Acknowledge and engage with what the user has shared
2. If they've completed the current step satisfactorily, introduce the next logical step
3. If they need more guidance or their response is insufficient, provide specific help for the current step
4. If they ask questions, answer them clearly and return focus to the current step
5. Keep the brainstorming momentum while ensuring quality completion of each step

Stay encouraging but focused. Only move forward when genuine progress is made.`;

export const initializeSession = async (sessionData) => {
  try {
    const formData = new FormData();
    formData.append('topic', sessionData.topic);
    formData.append('members', sessionData.members);
    formData.append('goal', sessionData.goal);

    if (sessionData.files?.length) {
      Array.from(sessionData.files).forEach(file => {
        formData.append('fileUpload', file);
      });
    }

    const response = await fetch('/api/initialize_session', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to initialize session');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error initializing session:', error);
    throw error;
  }
};

export const sendMessage = async (message, context) => {
  try {
    const response = await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        context: {
          topic: context.topic,
          members: context.members,
          goal: context.goal,
          history: context.history
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const saveNotes = async (notes) => {
  try {
    const response = await fetch('/api/save_notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ notes })
    });

    if (!response.ok) {
      throw new Error('Failed to save notes');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving notes:', error);
    throw error;
  }
};
