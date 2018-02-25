export { default } from './common/drug-dosage';
export const config = {
    "id": "drug-dosage-calculator",
    "title": "Drug Dosage Calculator",
    "type": "formula",
    "info": {
        "drugName": "Drug Dosage Calculator",
        "drugDosageInformation": []
    },
    "questions": [
        {
            "group": "Dosage",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter drug dose",
                    "values": ["mg/kg", "gm/kg", "mcg/kg"]
                }
            ]
        },
        {
            "group": "Weight",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter patient weight",
                    "values": ["kg", "lbs"]
                }
            ]
        },
        {
            "group": "Liquid Formulation (optional)",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter medication amount",
                    "values": ["mg", "gm", "mcg"]
                }
            ]
        },
        {
            "group": "Per Volume",
            "data": [
                {
                    "type": "input/select",
                    "placeholder": "Enter medication volume",
                    "values": ["mL", "L"]
                }
            ]
        }
    ],
    "results": {},
    "notes": {
        "type": "unordered-list",
        "content": []
    }
}
