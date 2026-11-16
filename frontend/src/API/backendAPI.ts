"use server";



export async function Predict(formData: FormData) {

    const drawing = formData.get("drawing");

    const response =  await fetch(
        "http://127.0.0.1:8000/predict",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(
                {
                    image: drawing
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


    return result
}