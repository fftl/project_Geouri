package com.ssafy.SmartMirror.dto;

import lombok.*;

@Getter
@ToString
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestMessage {
    private String member_key_from;
    private String member_key_to;
    private String content;
}
