export function confirmable(callback: (onConfirm: () => any) => any) {
    return function(target: any, propertyKey: string) {
        callback(() => {
            if (target != null && typeof(target[propertyKey]) === "function") {
                target[propertyKey]();
            }
        });
    }
}