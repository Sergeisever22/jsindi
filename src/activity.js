/**
 * Получает случайную активность с внешнего ресурса.
 * @returns {Promise<string>} Строка с описанием случайной активности.
 * @throws {Error} Если произошла ошибка при получении данных.
 */
async function getRandomActivity() {
    try {
        const response = await fetch('https://www.boredapi.com/api/activity/');
        if (!response.ok) {
            throw new Error('Произошла ошибка при получении данных');
        }
        const data = await response.json();
        return data.activity;
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
}

/**
 * Обновляет отображение активности на странице.
 * @returns {void}
 */
async function updateActivity() {
    try {
        const activity = await getRandomActivity();
        document.getElementById('activity').innerText = activity;
    } catch (error) {
        document.getElementById('activity').innerText = 'К сожалению, произошла ошибка';
    }
}

/**
 * Запускает обновление активности и повторяет процесс каждую минуту.
 * @returns {void}
 */
export function startActivity() {
    updateActivity();
    setTimeout(startActivity, 60 * 1000);
}