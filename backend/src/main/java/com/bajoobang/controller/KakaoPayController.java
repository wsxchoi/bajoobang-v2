package com.bajoobang.controller;

import com.bajoobang.domain.Member;
import com.bajoobang.pay.PayInfoDto;
import com.bajoobang.pay.response.BaseResponse;
import com.bajoobang.pay.response.PayReadyResDto;
import com.bajoobang.service.KakaoPayService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bajoobang.pay.response.PayApproveResDto;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;

    /** 결제 준비 redirect url 받기 --> 상품명과 가격을 같이 보내줘야함 */
    @GetMapping("/ready")
    public ResponseEntity<?> getRedirectUrl(@RequestBody PayInfoDto payInfoDto,
                                            HttpServletRequest request,
                                            HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            Member member = (Member) session.getAttribute("loginMember");
            try {
                PayReadyResDto payReadyResDto = kakaoPayService.getRedirectUrl(payInfoDto, member);
                response.sendRedirect(payReadyResDto.getNext_redirect_pc_url());
                return ResponseEntity.ok("GOOD");
            }
            catch(Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new BaseResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
            }
        }
        else return ResponseEntity.status(401).body("Unauthorized");
    }
    /**
     * 결제 성공 pid 를  받기 위해 request를 받고 pgToken은 rediret url에 뒤에 붙어오는걸 떼서 쓰기 위함
     */
    @GetMapping("/success/{orderId}") // {id+request_id}
    public void afterGetRedirectUrl(HttpServletResponse response,
                                      @PathVariable("orderId")String orderId,
                                      @RequestParam("pg_token") String pgToken) throws IOException {
        try {
            PayApproveResDto kakaoApprove = kakaoPayService.getApprove(pgToken, orderId);

            // 성공 시 클라이언트 창을 닫는 JavaScript 코드를 응답으로 보냅니다.
            response.setContentType("text/html; charset=UTF-8");
            response.getWriter().println("<script>alert('결제가 완료되었습니다.'); window.close();</script>");
        } catch (Exception e) {
            // 실패 시에도 클라이언트 창을 닫는 JavaScript 코드를 응답으로 보냅니다.
            response.setContentType("text/html; charset=UTF-8");
            response.getWriter().println("<script>alert('결제 처리에 실패하였습니다.'); window.close();</script>");
        }
    }

    /**
     * 결제 진행 중 취소
     */
    @GetMapping("/cancel")
    public ResponseEntity<?> cancel() {
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                .body(new BaseResponse<>(HttpStatus.EXPECTATION_FAILED.value(),"사용자가 결제를 취소하였습니다."));
    }

    /**
     * 결제 실패
     */
    @GetMapping("/fail")
    public ResponseEntity<?> fail() {

        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                .body(new BaseResponse<>(HttpStatus.EXPECTATION_FAILED.value(),"결제가 실패하였습니다."));

    }

}