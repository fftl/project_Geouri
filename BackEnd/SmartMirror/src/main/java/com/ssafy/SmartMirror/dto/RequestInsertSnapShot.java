package com.ssafy.SmartMirror.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@ToString
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestInsertSnapShot {
    private String serialNumber;
    private Long memberKey;
    private MultipartFile imgFile;
    private String imgName;
}
