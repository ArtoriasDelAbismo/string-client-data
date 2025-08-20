
import pandas as pd
import streamlit as st


st.title("CSV file managing tool")
uploaded_file = st.file_uploader("Choose file to upload", type="csv")


if uploaded_file is not None:
    st.subheader("File details")
    df = pd.read_csv(uploaded_file, index_col=0)
    st.write(df.head())
    st.write(df.shape)


    columns = df["Nombre"].tolist()
    st.write(columns)
    


    


