import EventInterface from '../../_shared/event/event.interface';

export default class ProductCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventDate: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventDate = eventData;
  }
}
