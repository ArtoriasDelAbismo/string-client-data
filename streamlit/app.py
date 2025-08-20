
import pandas as pd
import streamlit as st

st.set_page_config(
    page_title="CSV tool",
    page_icon="favicon.png"
)

st.sidebar.title("Navigation")
st.sidebar.title("Go to")

st.sidebar.markdown("[Home](https://tb-workshop.netlify.app/)")
st.sidebar.markdown("[Strings](https://tb-workshop.netlify.app/Strings)")
st.sidebar.markdown("[Workshop](https://tb-workshop.netlify.app/Workshop)")
st.sidebar.markdown("[Demos](https://tb-workshop.netlify.app/Demos)")


st.title("CSV file managing tool")
uploaded_file = st.file_uploader("Choose file to upload", type="csv")
if uploaded_file is None:
    st.subheader("Export file from Smart Manager choosing 'SKU', 'Nombre', 'Inventario', 'Precio normal'")

if uploaded_file is not None:
    df = pd.read_csv(uploaded_file, index_col=0)

    

    if st.button("Show details"):
        st.subheader("File details")
        filtered_df = df[df["Inventario"] > 0]

        st.write(f"Total Products: {len(df)}")
        st.write(f"Existent products {len(filtered_df)}")



        st.dataframe(filtered_df, use_container_width=True, height=600)
        st.write(filtered_df.shape)
    else: ""



    


    


