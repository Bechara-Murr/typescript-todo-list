class Task {
  id: number;
  title: string;
  description: string;
  date: string;

  constructor(id: number, title: string, description: string, date: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  getDate(): string {
    return this.date;
  }

  setDate(date: string): void {
    this.date = date;
  }

  toString(): string {
    return `Title: ${this.title}, Description: ${this.description}, Date: ${this.date}`;
  }
}

export default Task;
