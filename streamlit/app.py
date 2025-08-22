
import pandas as pd
import streamlit as st

def setup_page():
    st.set_page_config(
        page_title="CSV tool",
        page_icon="favicon.png"
    )
    

def display_sidebar():
    st.sidebar.title("Navigation")
    st.sidebar.title("Go to")
    st.sidebar.markdown("[Home](https://tb-workshop.netlify.app/)")
    st.sidebar.markdown("[Strings](https://tb-workshop.netlify.app/Strings)")
    st.sidebar.markdown("[Workshop](https://tb-workshop.netlify.app/Workshop)")
    st.sidebar.markdown("[Demos](https://tb-workshop.netlify.app/Demos)")
    

def display_csv_tool():
    st.title("CSV file managing tool")
    uploaded_file = st.file_uploader("Choose file to upload", type="csv")

    if uploaded_file is not None:
        try:
            df = pd.read_csv(uploaded_file, index_col=0)
            if st.button("Show details"):
                st.subheader("File details")
                if "inventario" in df.columns:
                    filtered_df = df[df["Inventario"] > 0]
                    st.write(f"Total Products: {len(df)}")
                    st.write(f"Existent products {len(filtered_df)}")
                    st.dataframe(filtered_df, use_container_width=True, height=600)
                    st.write(f"Rows/Columns {filtered_df.shape}")
                else: st.error("File must contain 'Inventario' column")
        except Excepcion as e:
            st.error(f"An error ocurred while processing the file: {e}")

def display_how_to_import():
    st.title("How to import file")
    st.write("Productos > Exportar CSV > Elegir 'SKU', 'Nombre', 'Inventario', 'Precio normal'")
    st.write("El archivo aparecerá en 'Descargas'")


def main():
    setup_page()
    display_sidebar()

    tab1, tab2 = st.tabs(["CSV tool", "How to import CSV"])
    with tab1:
        display_csv_tool()
    with tab2:
        display_how_to_import()

if __name__ == "__main__":
    main()






    


    


