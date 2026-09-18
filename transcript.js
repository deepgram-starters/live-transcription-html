export function addTranscriptItem(container, emptyState, text, isFinal) {
  if (emptyState && !emptyState.classList.contains('hidden')) {
    emptyState.classList.add('hidden');
  }

  const item = document.createElement('div');
  item.className = isFinal ? 'transcript-item' : 'transcript-item transcript-item--interim';

  const timestamp = document.createElement('div');
  timestamp.className = 'transcript-item__timestamp';
  timestamp.textContent = new Date().toLocaleTimeString();
  item.appendChild(timestamp);

  const textDiv = document.createElement('div');
  textDiv.className = 'transcript-item__text';
  textDiv.textContent = text;
  item.appendChild(textDiv);

  const lastItem = container.lastElementChild;
  if (lastItem && lastItem !== emptyState && lastItem.classList.contains('transcript-item--interim')) {
    container.replaceChild(item, lastItem);
  } else {
    container.appendChild(item);
  }

  container.scrollTop = container.scrollHeight;
}
