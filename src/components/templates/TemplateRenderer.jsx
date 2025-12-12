import React, { useMemo } from 'react';
// Import all 23 templates
import CeoTemplate from './CeoTemplate';
import DeveloperTemplate from './DeveloperTemplate';
import DoctorTemplate from './DoctorTemplate';
import EventManagerTemplate from './EventManagerTemplate';
import HairDresserTemplate from './HairDresserTemplate';
import HandyManTemplate from './HandyManTemplate';
import InteriorDesignTemplate from './InteriorDesignTemplate';
import LawyerTemplate from './LawyerTemplate';
import MusicPortfolio from './MusicPortfolio';
import TexiTemplate from './TexiTemplate';
import UiDesignerTemplate from './UiDesignerTemplate';
import PhotographerTemplate from './PhotographerTemplate';
import RestaurantTemplate from './RestaurantTemplate';
import FitnessTrainerTemplate from './FitnessTrainerTemplate';
import RealEstateAgentTemplate from './RealEstateAgentTemplate';
import MobileFashionBoutique from './MobileFashionBoutique';
import MobileTechConsultant from './MobileTechConsultant';
import MobileWellnessCoach from './MobileWellnessCoach';
import MobileCreativeStudio from './MobileCreativeStudio';

// Import student templates
import StudentBaseTemplate from '../student-templates/StudentBaseTemplate';
import StudentPortfolioTemplate from '../student-templates/StudentPortfolioTemplate';
import StudentMinimalTemplate from '../student-templates/StudentMinimalTemplate';
import StudentCreativeTemplate from '../student-templates/StudentCreativeTemplate';
import StudentDarkTemplate from '../student-templates/StudentDarkTemplate';

const TemplateRenderer = ({ templateId, profileData }) => {
  const TemplateComponent = useMemo(() => {
    const templateMap = {
      template1: CeoTemplate,
      template2: DeveloperTemplate,
      template3: DoctorTemplate,
      template4: EventManagerTemplate,
      template5: HairDresserTemplate,
      template6: HandyManTemplate,
      template7: InteriorDesignTemplate,
      template8: LawyerTemplate,
      template9: MusicPortfolio,
      template10: TexiTemplate,
      template11: UiDesignerTemplate,
      template12: PhotographerTemplate,
      template13: RestaurantTemplate,
      template14: FitnessTrainerTemplate,
      template15: RealEstateAgentTemplate,
      // Templates 16-19 were removed as per user request
      template20: MobileFashionBoutique,
      template21: MobileTechConsultant,
      template22: MobileWellnessCoach,
      template23: MobileCreativeStudio,
      // Student templates
      template111: StudentBaseTemplate,
      template112: StudentPortfolioTemplate,
      template113: StudentMinimalTemplate,
      template114: StudentCreativeTemplate,
      template115: StudentDarkTemplate
    };
    
    return templateMap[templateId] || CeoTemplate; // Default to CeoTemplate
  }, [templateId]);

  return <TemplateComponent profileData={profileData} />;
};

export default TemplateRenderer;