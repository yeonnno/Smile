package cp.smile.study_common.service;


import cp.smile.entity.study_common.StudyInformation;
import cp.smile.study_common.dto.request.CreateStudyDTO;
import cp.smile.study_common.dto.response.FindAllStudyDTO;
import cp.smile.study_common.dto.response.FindDetailStudyDTO;
import cp.smile.study_common.repository.StudyCommonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface StudyCommonService {


    List<FindAllStudyDTO> findAllStudy();
    void createStudy(int userId,CreateStudyDTO createStudyDTO); //스터디 생성


    FindDetailStudyDTO findDetailStudy(int id); //상세조회

}
