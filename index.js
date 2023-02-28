function areResponsesValid (questions, responses) {
  const responsesObj = {};
  for (const resp of responses) {
    responsesObj[resp.questionId] = resp.choice;
  }

  for (const {condition, id} of questions) {
    const required = isRequired(condition, responsesObj);

    if(required && !responsesObj[id] || !required && responsesObj[id]) {
      return false;
    }
  }

  return true;
}

function isRequired (condition, responses) {
  if (!condition) return true;

  if (condition.type === 'OR') {
    return condition.subconditions.some((cond) => isRequired(cond, responses));
  }

  if (condition.type === 'AND') {
    return condition.subconditions.every((cond) => isRequired(cond, responses));
  }

  return responses[condition.questionId] === condition.choice;
}
