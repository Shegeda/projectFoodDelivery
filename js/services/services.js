     // postData будет отвечать за постинг данных на сервер
     const postData = async (url, data) => {
        // внутри делаем запрос
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    async function getResource (url) {
        const res = await fetch(url);

        // Условие для избежания ошибок
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    export {postData};
    export {getResource};