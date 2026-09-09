(function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  const fields = {
    'full-name': {
      input: document.getElementById('full-name'),
      error: document.getElementById('full-name-error'),
      validate: (v) => v.trim() === '' ? 'Enter your full name.' : ''
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate: (v) => {
        if (v.trim() === '') return 'Enter your email address.';
        if (!v.includes('@')) return 'Include an @ in your email address.';
        return '';
      }
    },
    age: {
      input: document.getElementById('age'),
      error: document.getElementById('age-error'),
      validate: (v) => v.trim() === '' ? 'Enter your age.' : ''
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('message-error'),
      validate: (v) => v.trim() === '' ? 'Enter a message.' : ''
    }
  };

  Object.values(fields).forEach(({ input, error, validate }) => {
    input.addEventListener('input', () => {
      const problem = validate(input.value);
      if (!problem) {
        error.textContent = '';
        input.removeAttribute('aria-invalid');
      }
    });
  });

  function showStatus(kind, message) {
    status.className = 'visible ' + kind;
    status.textContent = message;
  }

  function addAdvice(advice) {
    if (!advice) return;
    const quote = document.createElement('blockquote');
    quote.textContent = advice;
    status.appendChild(quote);
  }

  function clearStatus() {
    status.className = '';
    status.textContent = '';
  }

  async function fetchAdvice() {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
      const data = await response.json();
      return data.slip && data.slip.advice ? data.slip.advice : null;
    } catch (error) {
      return null;
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearStatus();

    let firstInvalid = null;
    Object.values(fields).forEach(({ input, error, validate }) => {
      const problem = validate(input.value);
      error.textContent = problem;
      if (problem) {
        input.setAttribute('aria-invalid', 'true');
        if (!firstInvalid) firstInvalid = input;
      } else {
        input.removeAttribute('aria-invalid');
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const name = fields['full-name'].input.value.trim();
    showStatus('success', 'Thanks, ' + name + ' — your message is in.');
    form.reset();

    fetchAdvice().then((advice) => {
      if (advice) {
        status.firstChild.textContent += ' Here is something to read while you wait:';
        addAdvice(advice);
      } else {
        status.firstChild.textContent += ' The advice service is unavailable right now, but your message was still submitted.';
      }
    });
  });
})();
