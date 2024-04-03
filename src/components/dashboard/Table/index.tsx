import React from "react";
import { promises as fs } from "fs";
import path from "path";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { taskSchema } from "./data/schema";
import { z } from "zod";

// Simulate a database read for tasks.
async function getTasks() {
  const filePath = path.join(process.cwd(), "src/components/dashboard/Table/data/tasks.json");
  const data = await fs.readFile(filePath, 'utf8');
  
  const tasks = JSON.parse(data);
  return z.array(taskSchema).parse(tasks);
}

export default async function ProposalsTable() {
  const tasks = await getTasks();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
