export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export type LoginAuthDTO = {
  email: string;
  password: string;
};

export type RegisterAuthDTO = {
  name: string;
  email: string;
  password: string;
};



export interface ITask {
  _id: string;
  name: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject {
  _id: string;
  name: string;
  tasks: ITask[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProjectDto = {
  name: string;
};

export type UpdateProjectDto = {
  name: string;
};

export type CreateTaskDto = {
  name: string;
};

export type UpdateTaskDto = {
  name?: string;
  done?: boolean;
};
