import assert from 'node:assert/strict';
import test from 'node:test';

import { getErrorMessage, renderTranscript } from '../message.js';

function createElement() {
  const element = {
    children: [],
    className: '',
    textContent: '',
    appendChild(child) {
      this.children.push(child);
    }
  };
  element.classList = {
    add(name) {
      element.className = `${element.className} ${name}`.trim();
    },
    contains(name) {
      return element.className.split(' ').includes(name);
    }
  };
  return element;
}

function createContainer() {
  const container = createElement();
  Object.defineProperty(container, 'lastElementChild', {
    get() {
      return this.children.at(-1) ?? null;
    }
  });
  container.replaceChild = function replaceChild(next, previous) {
    this.children[this.children.indexOf(previous)] = next;
  };
  container.scrollHeight = 100;
  return container;
}

test('uses the nested backend error message', () => {
  assert.equal(
    getErrorMessage({ error: { message: 'Invalid API key' } }),
    'Invalid API key'
  );
});

test('falls back to the legacy backend description', () => {
  assert.equal(
    getErrorMessage({ description: 'HTTP 401' }),
    'HTTP 401'
  );
});

test('does not display Deepgram SchemaError message echoes', () => {
  assert.equal(
    getErrorMessage({
      variant: 'SchemaError',
      description: 'Could not deserialize client message',
      message: '{"type":"CloseStream"}'
    }),
    'Could not deserialize client message'
  );
});

test('uses a generic message for an empty error frame', () => {
  assert.equal(getErrorMessage({}), 'Deepgram connection failed');
});

test('renders transcript results through the production message helper', () => {
  const previousDocument = globalThis.document;
  globalThis.document = { createElement };
  try {
    const transcriptContainer = createContainer();
    const emptyState = createElement();
    emptyState.classList.add('hidden');

    const isFinal = renderTranscript(
      { channel: { alternatives: [{ transcript: 'hello' }] }, is_final: true },
      { transcriptContainer, emptyState }
    );

    assert.equal(isFinal, true);
    assert.equal(transcriptContainer.children.length, 1);
    assert.equal(transcriptContainer.lastElementChild.children[1].textContent, 'hello');
  } finally {
    globalThis.document = previousDocument;
  }
});
