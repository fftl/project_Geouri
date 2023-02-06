package com.ssafy.SmartMirror.repository;

import com.ssafy.SmartMirror.domain.AdultScript;
import com.ssafy.SmartMirror.domain.Widget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WidgetRepository  extends JpaRepository<Widget, String> {
}
