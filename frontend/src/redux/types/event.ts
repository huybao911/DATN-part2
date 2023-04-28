export interface IEvent {
    _id: any;
    nameEvent: string;
    poster: any;
    approver: any;
    comments: any;
    quantityUser: number;
    job: string;
    location: string;
    departmentEvent: any;
    costs: string;
    dayStart:string;
    dayEnd:string;
    update: string;
    delete: string;
    image: string;
    created_at:string;
    usersApplyJob:any;

    nameJob: string;
    unitPrice: number;
    
    userApply: any;
    applyStatus: string;
    approve: string;
    unapprove: string;
  }