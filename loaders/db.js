require('dotenv').config();
const mysql = require('mysql2/promise');
const config = require('../config/db-config');

const conn = async () => {
  const connection = mysql.createPool({
    ...config,
    connectionLimit: 20,
    connectTimeout: 5000
  });
  return connection;
};

module.exports = conn;

/**
 * DB TRANSACTION => DB의 *상태를 변화*시키기 위해 수행하는 작업 단위
 * 상태를 변화시킨다는 것 => SQL 질의어를 통해 DB에 접근( SELECT,INSERT,DELETE,UPDATE )
 * 하나의 트랜잭션 설계를 잘 만드는 것이 데이터를 다룰 때 많은 이점
 *
 * BEGINTRANSACTION =>
 * 여러개의 쿼리문이 실행된다는 작업단위 설정
 *
 * COMMIT =>
 * 하나의 트랜잭션이 성공적으로 끝났고, DB가 일관성있는 상태일 때 이를 알려주기 위해 사용
 *
 * ROLLBACK =>
 * transaction이 정상적으로 종료되지 않았을 때, last consistent state (Transaction의 시작 상태)로 rollback 가능
 */

/**
 * createConnection: DB에 대한 정보를 매개변수로 수신, *DB와 서버간의 연결 객체를 반환*
 * connect: 반환된 객체를 *실제 데이터 교환을 위해 연결*
 *
 * host : 사용할 DB가 설치된 호스트의 IP
 * port : DB를 설치할 때 사용자가 지정한 포트번호. 기본값은 3306
 * user : DB의 user 이름
 * password : DB를 설치할 때 사용자가 지정한 비밀번호
 * database : 사용할 데이터베이스의 이름
 */
