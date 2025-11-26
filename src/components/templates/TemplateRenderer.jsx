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
      template23: MobileCreativeStudio
    };
    
    return templateMap[templateId] || CeoTemplate; // Default to CeoTemplate
  }, [templateId]);

  return <TemplateComponent profileData={profileData} />;
};

export default TemplateRenderer;