"use server";



export async function Predict(formData: FormData) {

    const response =  await fetch(
        "http://127.0.0.1:8000/predict",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(
                {
                    image: formData
                }
            )
        }
    )


    const result = await response.json();

    if (!response.ok) {
        return {
            status: "invalid",
            data: result.detail
        }
    }

    return {
        status: "valid",
        data: result.prediction
    }
}