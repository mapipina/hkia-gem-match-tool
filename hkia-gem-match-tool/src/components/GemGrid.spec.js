import { mount } from '@vue/test-utils'
import { expect, test, beforeEach } from 'vitest'
import GemGrid from './GemGrid.vue'

beforeEach(() => {
  localStorage.clear();
});

test('renders exactly 12 grid slots', () => {
  const wrapper = mount(GemGrid);
  expect(wrapper.vm.gridState.length).toBe(12);
});

test('loads existing board state from localStorage on mount', () => {
  const mockBoard = Array(12).fill(null);
  mockBoard[0] = 'Red';
  mockBoard[11] = 'Green';
  localStorage.setItem('hkia-gem-match-board', JSON.stringify(mockBoard));

  const wrapper = mount(GemGrid);
  expect(wrapper.vm.gridState[0]).toBe('Red');
  expect(wrapper.vm.gridState[11]).toBe('Green');
});
