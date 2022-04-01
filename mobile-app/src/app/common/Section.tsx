import React, {PropsWithChildren, useCallback, useMemo, useState} from 'react';
import {Assets, Button, ButtonProps, ExpandableSection, Image, SkeletonView, Text, View} from 'react-native-ui-lib';

export interface SectionProps {
  headerTitle: string;
  top?: boolean;
  expandable?: boolean;
  loading?: boolean;
  rightButton?: ButtonProps;
}

const Section = (props: PropsWithChildren<SectionProps>) => {
  const [isExpended, setIsExpended] = useState(true);

  const toggleExpended = useCallback(() => {
    setIsExpended(!isExpended);
  }, [isExpended]);

  const headerJSX = useMemo(() => {
    return (
      <View flex row spread>
        <View flex row>
          {
            props.expandable && !isExpended && (
              <Image source={Assets.icons.plusSmall} width={24} height={24} marginR-10 />
            )
          }
          <Text header marginB-10>{props.headerTitle}</Text>
        </View>
        {
          props.rightButton && <Button link {...props.rightButton} />
        }
      </View>
    );
  }, [props.headerTitle, props.rightButton, isExpended, props.expandable]);

  // TODO: calculate width by device screen width
  const renderLoadingState = useCallback(() => (
    <View flex marginB-40>
      {headerJSX}
      <SkeletonView height={100} width={350} />
    </View>
  ), [headerJSX]);

  const renderExpandable = useCallback(() => {
    const extraProps = isExpended ? {'marginB-40': true} : {'marginB-10': true};

    return (
      <View flex {...extraProps}>
        <ExpandableSection
          top={props.top}
          sectionHeader={headerJSX}
          expanded={isExpended}
          onPress={toggleExpended}
        >
          <View flex marginH-10>
            {props.children}
          </View>
        </ExpandableSection>
      </View>
    );
  }, [props.top, props.children, headerJSX, isExpended, toggleExpended]);

  const render = useCallback(() => (
    <View flex marginB-40>
      {headerJSX}
      <View flex marginH-10>
        {props.children}
      </View>
    </View>
  ), [headerJSX, props.children]);

  if (props.loading) {
    return renderLoadingState();
  } else if (props.expandable) {
    return renderExpandable();
  } else {
    return render();
  }
};

export default Section;
