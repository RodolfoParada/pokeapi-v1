//localStore

export const saveState = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getState = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};