import React from 'react';
import {
  AvatarNext as Avatar,
  ButtonCircle,
  Flex,
  IconNext,
  IconNext as Icon,
  ListItemBase,
  ListItemBaseSection,
  Text,
} from '@momentum-ui/react-collaboration';

import useWebexClasses from '../../hooks/useWebexClasses';
import './CallHistoryItem.styles.scss';
import {
  formatDate,
  formatDurationFromDates,
  formatTime,
} from '../../utils/dateUtils';
import { useMakeCall } from '../../hooks/useMakeCall';
import { ICallHistoryItemProps } from './CallHistoryItem.types';

/**
 * @description CallHistoryItem renders a individual call history item.
 * @param {object} param An object parameter
 * @param {string} param.id The id of the item
 * @param {number} param.itemIndex The index of the item
 * @param {string} param.name The name of the item
 * @param {string} param.startTime The startTime of the item
 * @param {string} param.endTime The endTime of the item
 * @param {string} param.phoneNumber The phone number of the item
 * @param {string} param.disposition The disposition of the item
 * @param {string} param.direction The direction of the item
 * @param {string} param.callbackAddress The address of the item call address
 * @param {string} param.missedCallText The text for the missed call label
 * @param {boolean} param.isSelected The selected state of the item
 * @param {Function} param.onPress Handle when item is pressed
 * @param {Function} param.onVideoCallPress Handle when item video call button is pressed
 * @param param.audioCallLabel
 * @param param.videoCallLabel
 * @param {Function} param.onAudioCallPress Handle when item audio call button is pressed
 * @returns {React.Component} A CallHistoryItem for rendering
 */
export const CallHistoryItem = ({
  id,
  name,
  itemIndex = undefined,
  startTime,
  endTime,
  phoneNumber,
  callbackAddress = undefined,
  onPress = undefined,
  direction = undefined,
  disposition = undefined,
  isSelected = false,
  missedCallText = 'Missed call',
  audioCallLabel = 'Make an audio call',
  videoCallLabel = 'Make a video call',
}: ICallHistoryItemProps) => {
  const isMissed = disposition?.toLowerCase() === 'missed';
  const isOutgoing = direction?.toLowerCase() === 'outgoing';
  const duration = formatDurationFromDates(startTime, endTime);
  const [makeCall] = useMakeCall();

  const [cssClasses, sc] = useWebexClasses('call-history-item', undefined, {
    'is-missed': isMissed,
    'is-outgoing': isOutgoing,
    'is-selected': isSelected as boolean,
  });

  return (
    <ListItemBase
      id={id}
      itemIndex={itemIndex}
      size={50}
      isPadded
      isSelected={isSelected}
      className={cssClasses}
      onPress={onPress}
    >
      <ListItemBaseSection position="start" className={sc('icon')}>
        <Avatar title={name} size={32} />
      </ListItemBaseSection>
      <ListItemBaseSection position="fill" className={sc('content')}>
        <Flex>
          <Flex direction="column" className={sc('content-wrap')}>
            <Text type="body-primary" className={sc('name')}>
              {name}
            </Text>
            <Text type="body-secondary" className={sc('phoneNumber')}>
              {phoneNumber}
            </Text>
          </Flex>
          <Flex
            justifyContent="flex-start"
            xgap=".2rem"
            alignItems="center"
            className={sc('direction')}
          >
            {isOutgoing && (
              <Flex justifyContent="center" alignItems="flex-end" xgap="1rem">
                <IconNext name="outgoing-call-legacy" scale={16} />
              </Flex>
            )}
            {isMissed && (
              <Text type="body-secondary" className={sc('duration')}>
                {missedCallText}
              </Text>
            )}
            {!isMissed && (
              <Text type="body-secondary" className={sc('duration')}>
                {duration}
              </Text>
            )}
          </Flex>
        </Flex>
      </ListItemBaseSection>
      <ListItemBaseSection
        position="end"
        className={`chromatic-ignore ${sc('meta')}`}
      >
        <Flex
          alignItems="center"
          justifyContent="flex-end"
          className={sc('meta')}
        >
          <Flex xgap=".5rem" className={sc('actions')}>
            <ButtonCircle
              size={28}
              color="join"
              className={sc('video-btn')}
              title={videoCallLabel}
              aria-label={videoCallLabel}
              onPress={() => makeCall(callbackAddress || id, true)}
            >
              <Icon scale={18} name="video" />
            </ButtonCircle>
            <ButtonCircle
              size={28}
              color="join"
              className={sc('audio-btn')}
              title={audioCallLabel}
              aria-label={audioCallLabel}
              onPress={() => makeCall(callbackAddress || id, false)}
            >
              <Icon scale={18} name="audio-call" />
            </ButtonCircle>
          </Flex>
          <Flex
            direction="column"
            alignContent="flex-end"
            alignItems="flex-end"
            className={sc('datetime')}
          >
            <Text type="body-secondary" className={sc('date')}>
              {startTime && formatDate(startTime)}
            </Text>
            <Text type="body-secondary" className={sc('time')}>
              {startTime && formatTime(startTime)}
            </Text>
          </Flex>
        </Flex>
      </ListItemBaseSection>
    </ListItemBase>
  );
};