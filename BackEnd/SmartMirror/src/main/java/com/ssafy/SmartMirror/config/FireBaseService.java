package com.ssafy.SmartMirror.config;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class FireBaseService {

    @Value("${app.firebase-bucket}")
    private String firebaseBucket;

    public String uploadFiles(MultipartFile file, String nameFile) throws IOException {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        InputStream content = new ByteArrayInputStream(file.getBytes());
        Blob blob = bucket.create(nameFile.toString(), content, file.getContentType());
        String fileUrl = "https://firebasestorage.googleapis.com/v0/b/" + firebaseBucket +"/o/" + nameFile + "?alt=media";

        return fileUrl;
    }
}
