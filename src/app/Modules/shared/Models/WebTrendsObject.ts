import { environment } from 'src/environments/environment';

export interface IWebTrendsObject {
  tpd?: string;
  tpt?: string;
  appid_av?: string;
  appid?: string;
  TI?: string;
  channel?: string;
  action_av?: string;
  action?: string;
  new_cust_ind?: string;
  reg_to_my?: string;
  stage_desc?: string;
  stage_status?: number;
  errorMsg?: number;
  errormsg_desc?: string;
  verification_mode?: string;
  activity_number?: string;
  phone_number?: string;
  id_number?: string;
  email?: string;
  xparam_name?: string;
  xparam?: string;
}

export class WebTrendsObject {

    public tpd?: string;
    public tpt?: string;
    public appid_av?: string;
    public appid?: string;
    public TI?: string;
    public channel: string;
    public action_av?: string;
    public action?: string;
    public new_cust_ind?: string;
    public reg_to_my?: string;
    public stage_desc?: string;
    public stage_status?: number;
    public errorMsg?: number;
    public errormsg_desc?: string;
    public verification_mode?: string;
    public activity_number?: string;
    public phone_number?: string;
    public id_number?: string;
    public email?: string;

    constructor(wtObj: IWebTrendsObject) {
      this.appid_av = environment.webTrends.appId;
      this.appid = environment.webTrends.appId;
      this.TI = environment.webTrends.appId;

      this.action = (wtObj.action != null) ? wtObj.action : null;
      this.action_av = (wtObj.action != null) ? wtObj.action : null;
      this.new_cust_ind = (wtObj.action != null) ? wtObj.action : null;
      this.reg_to_my = (wtObj.action != null) ? wtObj.action : null;
      this.stage_desc = (wtObj.action != null) ? wtObj.action : null;

      this.stage_status = wtObj.stage_status;
      this.errorMsg = wtObj.errorMsg;
      this.errormsg_desc = wtObj.errormsg_desc;
      this.phone_number = wtObj.phone_number;
      this.id_number = wtObj.id_number;
      this.email = wtObj.email;

      this['x-param_name'] = (wtObj.xparam_name != null) ? wtObj.xparam_name : null;
      this['x-param'] = (wtObj.xparam != null) ? wtObj.xparam : null;
    }

    setAction(action: string, verification_mode?: string) {
        this.action = (action != null) ? action : null;
        this.action_av = (action != null) ? action : null;
        this.new_cust_ind = (action != null) ? action : null;
        this.reg_to_my = (action != null) ? action : null;
        this.stage_desc = (action != null) ? action : null;
        this.verification_mode = (verification_mode != null) ? verification_mode : null;
    }

    setVerificationMode(verification_mode: string) {
        this.verification_mode = verification_mode;
    }

    setDateTime() {
      const now = new Date();
      this.tpd = (now.getDate()) + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
      this.tpt = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    }

    setErrormsgDesc(errormsg_desc?: string) {
      this.errormsg_desc = (errormsg_desc != null) ? errormsg_desc : null;
    }

    setActivityNumber(activity_number: string) {
      this.activity_number = activity_number;
    }

    setCellNumber(phone_number: string) {
      this.phone_number = phone_number;
    }

    setIDNumber(id_number: string) {
      this.id_number = id_number;
    }

    setEmail(email: string) {
      this.email = email;
    }

    reset() {
      this.action = null;
      this.action_av = null;
      this.new_cust_ind = null;
      this.reg_to_my = null;
      this.stage_desc = null;
      this.verification_mode = null;
      this.stage_status = null;
      this.errorMsg = null;
      this.errormsg_desc = null;
      this.activity_number = null;
      this.phone_number = null;
      this.id_number = null;
      this.email = null;
    }
}
