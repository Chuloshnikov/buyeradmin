import axios from 'axios';

export default async function handler(req, res) {
  // Добавляем разрешение для доступа к API с другого домена
  res.setHeader('Access-Control-Allow-Origin', 'https://api.privatbank.ua');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    // Поддержка предварительных запросов CORS (preflight requests)
    res.status(200).end();
    return;
  }

  try {
    // Выполняем запрос к API https://api.privatbank.ua
    const response = await axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11');
    const data = response.data;
    
    // Возвращаем данные в ответе
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from PrivatBank API:', error);
    res.status(500).json({ error: 'Failed to fetch data from PrivatBank API' });
  }
}