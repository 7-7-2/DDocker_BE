// controllers => Request, Response를 담당

/** EXAMPLE CONTROLLER
 *  async (req, res, next) => {
    // 실질적인 라우터 레벨의 책임(req => )
    const userDTO = req.body;

    // 서비스 레이어로의 책임 이동
    // 데이터 레이어로의 접근과 비즈니스 로직 추상화
    const { user, company } = await UserService.Signup(userDTO);

    // ( => res)
    return res.json({ user, company });
 */

/**
 * !! REQ => 
 * req.params : 이름 붙은 라우트 파라미터
 * req.query : GET 방식으로 넘어오는 쿼리 스트링 파라미터
 * req.body : POST 방식으로 넘어오는 파라미터(body-parser)
 * 
 * !! RES =>
 * res.status(code) : HTTP 응답 코드
 * res.send(body), res.send(status, body) : 클라이언트에 보내는 응답. 상태 코드는 옵션.
 *    기본 콘텐츠 타입은 text/html, text/plain을 보내려면 res.set(‘Content-Type’, ‘text/plain’)을 먼저 호출. 
 *    JSON을 보낼거면 res.json
 * res.json(json), res.json(status, json) : 클라이언트로 JSON 값
 * res.sendFile(path, [options], [callback]) : path의 파일을 읽고 해당 내용을 클라이언트로 전송.
 */