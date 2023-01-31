export interface ICallHistoryItemProps {
  id: string;
  name: string;
  phoneNumber: string;
  startTime: string;
  endTime: string;
  direction?: string | 'INCOMING' | 'OUTGOING';
  disposition?: string;
  isSelected?: boolean;
  callbackAddress?: string;
  missedCallText?: string;
  onPress?: (e: unknown) => void;
  itemIndex?: number;
  audioCallLabel?: string;
  videoCallLabel?: string;
}