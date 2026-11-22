import type {AppConfigInput} from '@imdeepmind/ross';

/**
 * Per-route policy.
 *
 * Generated routes write and read the owner from `[[userId]]`; clients never
 * send `user_id`. The unscoped primary-key lookup routes are disabled.
 */
export const apis: NonNullable<AppConfigInput['apis']> = {
  'model.v1.todo_folders.unknown.insert': {
    serverSideParams: [{type: 'body', name: 'user_id', value: '[[userId]]'}],
  },
  'model.v1.todo_todos.unknown.insert': {
    serverSideParams: [{type: 'body', name: 'user_id', value: '[[userId]]'}],
  },
  'model.v1.todo_tags.unknown.insert': {
    serverSideParams: [{type: 'body', name: 'user_id', value: '[[userId]]'}],
  },
  'model.v1.todo_todo_tags.unknown.insert': {
    serverSideParams: [{type: 'body', name: 'user_id', value: '[[userId]]'}],
  },
  'model.v1.todo_folders.unknown.getAll': {
    serverSideParams: [
      {type: 'query', name: 'user_id_eq', value: '[[userId]]'},
    ],
  },
  'model.v1.todo_todos.unknown.getAll': {
    serverSideParams: [
      {type: 'query', name: 'user_id_eq', value: '[[userId]]'},
    ],
  },
  'model.v1.todo_tags.unknown.getAll': {
    serverSideParams: [
      {type: 'query', name: 'user_id_eq', value: '[[userId]]'},
    ],
  },
  'model.v1.todo_todo_tags.unknown.getAll': {
    serverSideParams: [
      {type: 'query', name: 'user_id_eq', value: '[[userId]]'},
    ],
  },
  'model.v1.todo_folders.name.search': {
    serverSideParams: [
      {type: 'query', name: 'user_id_eq', value: '[[userId]]'},
    ],
  },
  'model.v1.todo_todos.title.search': {
    serverSideParams: [
      {type: 'query', name: 'user_id_eq', value: '[[userId]]'},
    ],
  },
  'model.v1.todo_tags.name.search': {
    serverSideParams: [
      {type: 'query', name: 'user_id_eq', value: '[[userId]]'},
    ],
  },
  'model.v1.todo_folders.user_id.edit': {
    serverSideParams: [{type: 'path', name: 'user_id', value: '[[userId]]'}],
  },
  'model.v1.todo_todos.user_id.edit': {
    serverSideParams: [{type: 'path', name: 'user_id', value: '[[userId]]'}],
  },
  'model.v1.todo_tags.user_id.edit': {
    serverSideParams: [{type: 'path', name: 'user_id', value: '[[userId]]'}],
  },
  'model.v1.todo_todo_tags.user_id.edit': {
    serverSideParams: [{type: 'path', name: 'user_id', value: '[[userId]]'}],
  },
  'model.v1.todo_todos.id.delete': {
    serverSideParams: [
      {type: 'query', name: 'user_id_eq', value: '[[userId]]'},
    ],
  },
  'model.v1.todo_todos.folder_id.delete': {
    serverSideParams: [
      {type: 'query', name: 'user_id_eq', value: '[[userId]]'},
    ],
  },
  'model.v1.todo_folders.id.delete': {
    serverSideParams: [
      {type: 'query', name: 'user_id_eq', value: '[[userId]]'},
      {type: 'query', name: 'is_default_eq', value: false},
    ],
  },
  'model.v1.todo_tags.id.delete': {
    serverSideParams: [
      {type: 'query', name: 'user_id_eq', value: '[[userId]]'},
    ],
  },
  'model.v1.todo_todo_tags.id.delete': {
    serverSideParams: [
      {type: 'query', name: 'user_id_eq', value: '[[userId]]'},
    ],
  },
  'model.v1.todo_folders.id.index': {enabled: false},
  'model.v1.todo_todos.id.index': {enabled: false},
  'model.v1.todo_tags.id.index': {enabled: false},
  'model.v1.todo_todo_tags.id.index': {enabled: false},
};
