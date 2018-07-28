export interface ResourceTask {
    taskId: number;
    taskName: string;
    resourceId: number;
    resourceName: string;
    dueDate: string;
    customerId: number;
    customerName: string;
    details: string;
    isTaskCompleted: boolean;
    completedDate: string;
    isDeleted: boolean;
}