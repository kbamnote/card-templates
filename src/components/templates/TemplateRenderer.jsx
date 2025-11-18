import React, { useMemo } from 'react';
// Import all 11 templates
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
      template11: UiDesignerTemplate
    };
    
    return templateMap[templateId] || CeoTemplate; // Default to CeoTemplate
  }, [templateId]);

  return <TemplateComponent profileData={profileData} />;
};

export default TemplateRenderer;