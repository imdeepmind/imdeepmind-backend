import type {AppConfigInput} from '@imdeepmind/ross';

type ModelsConfig = NonNullable<NonNullable<AppConfigInput['data']>['models']>;

/**
 * Data models exposed by the API.
 *
 * The `users` model backs username/password authentication. It is the auth
 * user model, so its CRUD routes are disabled by default; users are managed
 * through the generated `/auth` routes instead.
 */
export const models: ModelsConfig = {
  users: {
    // Adds `created_at` / `updated_at` columns maintained by the ORM.
    timestamps: true,
    fields: {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
        apis: ['index', 'edit', 'delete'],
      },
      username: {
        type: 'string',
        nullable: false,
        unique: true,
        apis: ['search', 'edit'],
      },
      password: {
        type: 'string',
        nullable: false,
        // Hashes are never returned by the API.
        secret: true,
        apis: ['edit'],
      },
      provider: {
        type: 'string',
        nullable: false,
        default: 'up-auth',
      },
      verified: {
        type: 'boolean',
        nullable: false,
        default: false,
      },
    },
  },
  todo_folders: {
    timestamps: true,
    fields: {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
        apis: ['delete'],
        query: ['eq'],
      },
      user_id: {
        type: 'integer',
        nullable: false,
        apis: ['edit'],
        query: ['eq'],
      },
      name: {
        type: 'string',
        nullable: false,
        apis: ['search', 'edit'],
        query: ['eq', 'sort'],
      },
      is_default: {
        type: 'boolean',
        nullable: false,
        default: false,
        query: ['eq'],
      },
    },
    indexes: {
      idx_todo_folders_user_name: {
        fields: ['user_id', 'name'],
        unique: true,
      },
    },
    relations: {
      user: {
        type: 'belongsTo',
        model: 'users',
        localField: 'user_id',
        foreignField: 'id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    },
  },
  todo_todos: {
    timestamps: true,
    fields: {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
        apis: ['delete'],
        query: ['eq', 'sort'],
      },
      user_id: {
        type: 'integer',
        nullable: false,
        apis: ['edit'],
        query: ['eq'],
      },
      folder_id: {
        type: 'integer',
        nullable: false,
        apis: ['delete'],
        query: ['eq'],
      },
      title: {
        type: 'string',
        nullable: false,
        apis: ['search'],
      },
      completed: {
        type: 'boolean',
        nullable: false,
        default: false,
        query: ['eq', 'ne'],
      },
    },
    indexes: {
      idx_todo_todos_user_folder: {
        fields: ['user_id', 'folder_id'],
      },
      idx_todo_todos_user_done: {
        fields: ['user_id', 'completed'],
      },
    },
    relations: {
      user: {
        type: 'belongsTo',
        model: 'users',
        localField: 'user_id',
        foreignField: 'id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      folder: {
        type: 'belongsTo',
        model: 'todo_folders',
        localField: 'folder_id',
        foreignField: 'id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    },
  },
  todo_tags: {
    timestamps: true,
    fields: {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
        apis: ['delete'],
        query: ['eq'],
      },
      user_id: {
        type: 'integer',
        nullable: false,
        apis: ['edit'],
        query: ['eq'],
      },
      name: {
        type: 'string',
        nullable: false,
        apis: ['search', 'edit'],
        query: ['eq', 'sort'],
      },
    },
    indexes: {
      idx_todo_tags_user_name: {
        fields: ['user_id', 'name'],
        unique: true,
      },
    },
    relations: {
      user: {
        type: 'belongsTo',
        model: 'users',
        localField: 'user_id',
        foreignField: 'id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    },
  },
  todo_todo_tags: {
    timestamps: true,
    fields: {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
        apis: ['delete'],
        query: ['eq'],
      },
      user_id: {
        type: 'integer',
        nullable: false,
        apis: ['edit'],
        query: ['eq'],
      },
      todo_id: {
        type: 'integer',
        nullable: false,
        query: ['eq'],
      },
      tag_id: {
        type: 'integer',
        nullable: false,
        query: ['eq', 'in'],
      },
    },
    indexes: {
      idx_todo_todo_tags_unique: {
        fields: ['user_id', 'todo_id', 'tag_id'],
        unique: true,
      },
    },
    relations: {
      user: {
        type: 'belongsTo',
        model: 'users',
        localField: 'user_id',
        foreignField: 'id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      todo: {
        type: 'belongsTo',
        model: 'todo_todos',
        localField: 'todo_id',
        foreignField: 'id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      tag: {
        type: 'belongsTo',
        model: 'todo_tags',
        localField: 'tag_id',
        foreignField: 'id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    },
  },
};
