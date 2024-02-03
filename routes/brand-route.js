const express = require('express');
const router = express.Router();
const errorHandler = require('../middlewares/errorHandler');
const brandController = require('../controllers/brand-controller');

router.get('/brand', errorHandler(brandController.getBrand));

// router.get('/brand', async (req, res) => {
//   try {
//     // 연결을 가져옵니다.
//     const connection = await conn();
//     // MySQL 쿼리를 실행합니다.
//     const [rows, fields] = await connection.query(
//       'SELECT brand_name, name, caffeine FROM brand'
//     );
//     // 결과를 클라이언트에 전송합니다.
//     res.json({ data: rows });
//     // 연결을 닫습니다.
//     if (connection) {
//       connection.end();
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server // Error' });
//   }
// });

module.exports = router;
