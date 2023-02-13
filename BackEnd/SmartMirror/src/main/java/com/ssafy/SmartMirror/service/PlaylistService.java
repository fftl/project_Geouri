package com.ssafy.SmartMirror.service;

import com.ssafy.SmartMirror.domain.Playlist;
import com.ssafy.SmartMirror.domain.Widget;
import com.ssafy.SmartMirror.dto.RequestMember;
import com.ssafy.SmartMirror.repository.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaylistService {

    private PlaylistRepository playlistRepository;

    @Autowired
    public PlaylistService(PlaylistRepository playlistRepository){
        this.playlistRepository = playlistRepository;
    }

    public String findByMemberKey(String memberKey) {
        // memberKey 에 해당하는 플레이 정보 DB 에서 read
        Playlist playlist = playlistRepository.findById(memberKey).orElse(null);
        if(playlist == null) return null; // 링크 없으면 null
        return playlist.getLink(); // 플레이리스트 링크 전달
    }

    public int updateLink(String link, String memberKey) {
        int result = playlistRepository.updateLink(link, memberKey);
        return result;
    }

    public Playlist savePlaylist(RequestMember requestMember, String memberKey) {


        Playlist playlist = Playlist.builder()
                .memberKey(memberKey)
                .link(requestMember.getPlaylistLink())
                .build();

        Playlist newPlaylist = playlistRepository.save(playlist);
        return newPlaylist;

    }
}
