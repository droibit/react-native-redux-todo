declare module "react-native-i18n" {
    var fallbacks: boolean;
    var translations: {
        [keys: string]: any;
    };
    var defaultLocale: string;
    var locale: string;
    function currentLocale(): string;
    function t(key: "title"): string;
    function t(key: "todoList"): string;
    function t(key: "noTasks"): string;
    function t(key: "todoListHeaderAll"): string;
    function t(key: "todoListHeaderActive"): string;
    function t(key: "todoListHeaderCompleted"): string;
    function t(key: "todoListFilterAll"): string;
    function t(key: "todoListFilterActive"): string;
    function t(key: "todoListFilterCompleted"): string;
    function t(key: "todoListSortBy"): string;
    function t(key: "todoListClearCompleted"): string;
    function t(key: "todoListSortByTitle"): string;
    function t(key: "todoListSortByCreatedDate"): string;
    function t(key: "todoListLoading"): string;
    function t(key: "newTask"): string;
    function t(key: "newTaskFailedToCreate"): string;
    function t(key: "newTaskSuccessfulToCreate"): string;
    function t(key: "updateTask"): string;
    function t(key: "updateTaskFailedToUpdate"): string;
    function t(key: "updateTaskSuccessfulToUpdate"): string;
    function t(key: "editTaskTitleLabel"): string;
    function t(key: "editTaskTitleValidationError"): string;
    function t(key: "editTaskDescLabel"): string;
    function t(key: "editTaskDescHint"): string;
    function t(key: "filterAndSortTask"): string;
    function t(key: "filterTask"): string;
    function t(key: "sortTask"): string;
    function t(key: "filterTaskAll"): string;
    function t(key: "filterTaskActive"): string;
    function t(key: "filterTaskCompleted"): string;
    function t(key: "sortTaskByTimpestamp"): string;
    function t(key: "sortTaskByTitle"): string;
    function t(key: "statistics"): string;
    function t(key: "statisticsActiveTasks"): string;
    function t(key: "statisticsCompletedTasks"): string;
    function t(key: "settings"): string;
    function t(key: "appCategory"): string;
    function t(key: "sourceCodeTitle"): string;
    function t(key: "buildVersionTitle"): string;
    function t(key: "buildVersionSubtitle"): string;
}

declare module "*.json" {
    const value: any;
    export default value;
}