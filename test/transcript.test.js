import assert from 'node:assert/strict';
import test from 'node:test';

import { addTranscriptItem } from '../transcript.js';

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

test('final transcript replaces the preceding interim transcript', () => {
  const previousDocument = globalThis.document;
  globalThis.document = { createElement };
  try {
    const container = createContainer();
    const emptyState = createElement();
    emptyState.classList.add('hidden');

    addTranscriptItem(container, emptyState, 'partial', false);
    addTranscriptItem(container, emptyState, 'complete', true);

    assert.equal(container.children.length, 1);
    assert.equal(container.lastElementChild.classList.contains('transcript-item--interim'), false);
    assert.equal(container.lastElementChild.children[1].textContent, 'complete');
  } finally {
    globalThis.document = previousDocument;
  }
});
