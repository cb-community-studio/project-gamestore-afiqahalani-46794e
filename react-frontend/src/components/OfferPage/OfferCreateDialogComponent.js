
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';


 
const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const OfferCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        set_entity({})
    },[props.show])
    const onSave = async () => {
        let _data = {
            promotion: _entity.promotion,
            valueFromDate: _entity.valueFromDate,
            valueToDate: _entity.valueToDate,
            discount: _entity.discount

        };

        setLoading(true);
        try {
            const result = await client.service("offer").create(_data);
            props.onHide();
            props.alert({ type: "success", title: "Create", message: "Created successfully" });
            props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="offer-create-dialog-component">
                <div>
                    <p className="m-0" >Promotion:</p>
                    <InputText className="w-full mb-3" value={_entity?.promotion} onChange={(e) => setValByKey("promotion", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >From:</p>
                    <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.valueFromDate} onChange={ (e) => setValByKey("valueFromDate", e.target.value)} showTime ></Calendar>
                </div>
                <div>
                    <p className="m-0" >To:</p>
                    <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={_entity?.valueToDate} onChange={ (e) => setValByKey("valueToDate", e.target.value)} showTime ></Calendar>
                </div>
                <div>
                    <p className="m-0" >Discount:</p>
                    <InputText className="w-full mb-3" value={_entity?.discount} onChange={(e) => setValByKey("discount", e.target.value)}  />
                </div>


                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    //
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(OfferCreateDialogComponent);
// createDialog_code.template