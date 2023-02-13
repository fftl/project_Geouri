package com.ssafy.SmartMirror.config;

import com.ssafy.SmartMirror.domain.Brushing;
import com.ssafy.SmartMirror.domain.KidsResponse;
import com.ssafy.SmartMirror.domain.KidsScript;
import com.ssafy.SmartMirror.domain.Member;
import com.ssafy.SmartMirror.service.KidsResponseService;
import com.ssafy.SmartMirror.service.KidsScriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Component
public class ScriptDetail {

    static final int START = 0;         // 시작
    static final int MORNING = 1;       // 오전
    static final int AFTERNOON = 2;     // 오후
    static final int EVENING = 3;       // 저녁
    static final int ALLTIME = 4;       // 평시
    static final int BRUSHING_ASK = 5;  // 양치 제안
    static final int BRUSHING_START = 6;// 양치 시작
    static final int HADN_ASK = 7;      // 손씻기 제안
    static final int HAND_START = 8;    // 손씻기 시작

    private KidsScriptService kidsScriptService;
    private KidsResponseService kidsResponseService;
    private Utils utils;

    @Autowired
    public ScriptDetail(KidsScriptService kidsScriptService, KidsResponseService kidsResponseService, Utils utils) {
        this.kidsScriptService = kidsScriptService;
        this.kidsResponseService = kidsResponseService;
        this.utils = utils;
    }

    /**
     * 거울에 도착했을 때, 시작할 인사 말을 시간대 별로 판단하여 불러옵니다.
     */
    public KidsScript getHelloScript(LocalDateTime now, Member member, Long reqKey, int reaction) {
        // 현재 시간대를 판단합니다.
        int nowHour = now.getHour();
        int nowType = utils.whatTime(nowHour);

        // 현재 시간대에 할 수 있는 인사 리스트를 가져옵니다.
        List<KidsResponse> kidsResponseList = kidsResponseService.getKidsResponseSelect(reqKey, reaction, nowType);
        if (kidsResponseList.isEmpty()) return null;

        // 인사말의 순서를 섞어줍니다. ( 랜덤한 인사말을 보내주기 위해 )
        Collections.shuffle(kidsResponseList);

        // 섞어낸 응답이므로 첫번째 것을 그냥 가져옵니다.
        KidsResponse kidsResponse = kidsResponseList.get(0);
        KidsScript kidsScript = kidsScriptService.getKidsScript(kidsResponse.getResKey());

        return kidsScript;
    }

    /**
     * 인사 이후 양치제안, 손씻기 제안을 판단합니다.
     * */
    public KidsScript getAskScript(LocalDateTime now, Member member, Long reqKey, int reaction, List<Brushing> brushingList) {
        int nowYear = now.getYear();
        int nowMonth = now.getMonthValue();
        int nowDay = now.getDayOfMonth();

        // 아직 양치를 한 적이 한 번도 없을 경우 ( 양치 기록이 하나도 존재하지 않음 )
        if (brushingList.isEmpty()) {
            // 현재 시간대에 할 수 있는 인사 리스트를 가져옵니다.
            List<KidsResponse> kidsResponseList = kidsResponseService.getKidsResponseSelect(reqKey, reaction, BRUSHING_ASK);
            if (kidsResponseList.isEmpty()) return null;

            // 인사말의 순서를 섞어줍니다. ( 랜덤한 인사말을 보내주기 위해 )
            Collections.shuffle(kidsResponseList);

            // 섞어낸 응답이므로 첫번째 것을 그냥 가져옵니다.
            KidsResponse kidsResponse = kidsResponseList.get(0);
            System.out.println("jkejkjk "+kidsResponse);
            KidsScript kidsScript = kidsScriptService.getKidsScript(kidsResponse.getResKey());
            System.out.println("dfksdkfsdk: "+kidsScript);
            return kidsScript;


        } else { // 양치 기록이 하나라도 있다면

            Brushing brushing = brushingList.get(brushingList.size() - 1);
            String[] date = brushing.getBrushingTime().split(" ");
            String[] days = date[0].split("-");
            String[] times = date[1].split(":");

            //2023 2 9
            //마지막으로 양치를 한 날짜와 현재 날짜를 비교하여 오늘에 양치를 했는지 먼저 판단합니다.
            int daysSum = nowYear * 10000 + nowMonth * 100 + nowDay;
            int brushingDaysSum = Integer.parseInt(days[0]) * 10000 + Integer.parseInt(days[1]) * 100 + Integer.parseInt(days[2]);

            //오늘 양치를 한 기록이 하나라도 있다면?
            if (daysSum == brushingDaysSum) {

                // 현재 시간대를 판단합니다.
                int historyType = utils.whatTime(Integer.parseInt(times[0]));
                int nowType = utils.whatTime(now.getHour());

                // 양치 기록의 시간 타입이 현재 시간 타입과 같다면 이미 이번 타임에는 양치를 했다고 판단할 수 있습니다.
                // 따라서 손씻기를 제안합니다.
                if (historyType == nowType) {
                    List<KidsResponse> kidsResponseList = kidsResponseService.getKidsResponseSelect(reqKey, reaction, HADN_ASK);

                    if (kidsResponseList.isEmpty()) return null;

                    // 제안의 순서를 섞어줍니다.
                    Collections.shuffle(kidsResponseList);

                    // 섞어낸 응답이므로 첫번째 것을 그냥 가져옵니다.
                    KidsResponse kidsResponse = kidsResponseList.get(0);
                    System.out.println("jkejkjk "+kidsResponse);
                    KidsScript kidsScript = kidsScriptService.getKidsScript(kidsResponse.getResKey());
                    System.out.println("dfksdkfsdk: "+kidsScript);
                    return kidsScript;

                    //이번 시간에 양치를 하지 않았습니다. 양치를 제안합니다.
                } else {

                    // 양치를 제안하기 전에, 마지막 양치 이후 쿨타임이 모두 끝나지 않았으면 양치를 제안하지 않고 나갑니다.
                    // 마지막 양치 시간 + 쿨타임시간 > 현재시간 이면 쿨타임이 아직 끝나지 않음
                    int lastHour = Integer.parseInt(times[0])*3600;
                    int lastMin = Integer.parseInt(times[1])*60;
                    int lastSec = Integer.parseInt(times[2]);
                    int lastTotal = lastHour+lastMin+lastSec;

                    int nowHour = now.getHour()*3600;
                    int nowMin = now.getMinute()*60;
                    int nowSec = now.getSecond();
                    int nowTotal = nowHour+nowMin+nowSec;

                    // 쿨타임이 지나지 않음
                    if(lastTotal + 3600*4 > nowTotal) {
                        List<KidsResponse> kidsResponseList = kidsResponseService.getKidsResponseSelect(reqKey, reaction, HADN_ASK);

                        if (kidsResponseList.isEmpty()) return null;

                        // 제안의 순서를 섞어줍니다.
                        Collections.shuffle(kidsResponseList);

                        // 섞어낸 응답이므로 첫번째 것을 그냥 가져옵니다.
                        KidsResponse kidsResponse = kidsResponseList.get(0);
                        System.out.println("jkejkjk "+kidsResponse);
                        KidsScript kidsScript = kidsScriptService.getKidsScript(kidsResponse.getResKey());
                        System.out.println("dfksdkfsdk: "+kidsScript);
                        return kidsScript;
                    }

                    // 쿨타임이 지남
                    List<KidsResponse> kidsResponseList = kidsResponseService.getKidsResponseSelect(reqKey, reaction, BRUSHING_ASK);

                    if (kidsResponseList.isEmpty()) return null;

                    // 제안의 순서를 섞어줍니다.
                    Collections.shuffle(kidsResponseList);

                    // 섞어낸 응답이므로 첫번째 것을 그냥 가져옵니다.
                    KidsResponse kidsResponse = kidsResponseList.get(0);
                    System.out.println("jkejkjk "+kidsResponse);

                    KidsScript kidsScript = kidsScriptService.getKidsScript(kidsResponse.getResKey());
                    System.out.println("dfksdkfsdk: "+kidsScript);

                    return kidsScript;
                }
            } else {
                // 현재 시간대에 할 수 있는 인사 리스트를 가져옵니다.
                List<KidsResponse> kidsResponseList = kidsResponseService.getKidsResponseSelect(reqKey, reaction, BRUSHING_ASK);
                if (kidsResponseList.isEmpty()) return null;

                // 인사말의 순서를 섞어줍니다. ( 랜덤한 인사말을 보내주기 위해 )
                Collections.shuffle(kidsResponseList);

                // 섞어낸 응답이므로 첫번째 것을 그냥 가져옵니다.
                KidsResponse kidsResponse = kidsResponseList.get(0);
                KidsScript kidsScript = kidsScriptService.getKidsScript(kidsResponse.getResKey());

                return kidsScript;
            }
        }
    }

    /**
     * 대기 상태에서의 능동적인 손씻기 제안
     * */
    public KidsScript getStartScript(Long reqKey, int reaction, int type) {
        KidsScript kidsScript = null;
        // 이전 제안에 대한 응답을 기준으로 올 수 있는 응답을 모두 가져옵니다.
        List<KidsResponse> kidsResponseList = kidsResponseService.getKidsStart(reaction, type);
        if (kidsResponseList.isEmpty()) return null;

        // 응답의 순서를 섞어줍니다. ( 랜덤한 인사말을 보내주기 위해 )
        Collections.shuffle(kidsResponseList);

        // 섞어낸 응답이므로 첫번째 것을 그냥 가져옵니다.
        KidsResponse kidsResponse = kidsResponseList.get(0);
        kidsScript = kidsScriptService.getKidsScript(kidsResponse.getResKey());

        return kidsScript;

    }

    /**
     * 분기가 필요하지 않은 응답 반환하기
     * */
    public KidsScript getBasicScript(Long reqKey, int reaction) {
        KidsScript kidsScript = null;

        // 이전 제안에 대한 응답을 기준으로 올 수 있는 응답을 모두 가져옵니다.
        List<KidsResponse> kidsResponseList = kidsResponseService.getKidsResponse(reqKey, reaction);
        if (kidsResponseList.isEmpty()) return null;

        // 응답의 순서를 섞어줍니다. ( 랜덤한 인사말을 보내주기 위해 )
        Collections.shuffle(kidsResponseList);

        // 섞어낸 응답이므로 첫번째 것을 그냥 가져옵니다.
        KidsResponse kidsResponse = kidsResponseList.get(0);
        kidsScript = kidsScriptService.getKidsScript(kidsResponse.getResKey());

        return kidsScript;
    }
}
