import { flow, types, destroy, castToSnapshot } from 'mobx-state-tree';

interface PostResponse {
  message: string;
  payload: object;
}

interface TaskPayload {
  id: string;
  title: string;
  isDone: boolean;
}

const TaskInfo = types
  .model('TaskInfo', {
    title: types.optional(types.string, ''),
    isDone: types.optional(types.boolean, false),
    id: types.optional(types.string, ''),
  })
  .actions(self => {
    const toggleTask = flow(function*() {
      console.log('came to toogleTask, id', self.id);
      try {
        yield fetch(`http://localhost:4000/todo/lists/${self.id}`, {
          method: 'PUT',
        });
        self.isDone = !self.isDone;
      } catch (err) {
        console.log(err);
      }
    });

    return {
      toggleTask,
    };
  });

const TaskStore = types
  .model('Tasks', {
    tasks: types.optional(types.array(TaskInfo), []),
  })
  .actions(self => {
    const getAllTasks = flow(function*() {
      try {
        const response = yield fetch('http://localhost:4000/todo/lists').then(
          r => r.json()
        );

        response.forEach((element: any) => {
          const newTask = TaskInfo.create({
            title: element.title,
            isDone: element.isDone,
            id: element._id,
          });
          self.tasks.push(newTask);
        });
      } catch (err) {
        console.log(err, 'ERr');
      }
    });

    const addTodo = flow(function*(title) {
      try {
        const response = yield fetch(`http://localhost:4000/todo`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ title }),
        }).then(r => r.json());
        const responseTask = response.payload;

        const newTask = TaskInfo.create({
          id: responseTask.id,
          title: responseTask.title,
          isDone: responseTask.isDone,
        });

        self.tasks.push(newTask);
      } catch (err) {
        console.log(err, 'rrr');
      }
    });
    const removeTask = flow(function*(item) {
      try {
        yield fetch(`http://localhost:4000/todo/lists/${item.id}`, {
          method: 'DELETE',
        });
        destroy(item);
      } catch (err) {
        console.log(err);
      }
    });

    return {
      getAllTasks,
      addTodo,
      removeTask,
    };
  });

export default TaskStore;

export { TaskInfo };
