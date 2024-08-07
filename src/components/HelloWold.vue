<template>
  <div class="hello-world">
    <h1>{{ message }}</h1>
    <button @click="changeMessage">Change Message</button>
    <div v-if="showDetails">
      <p>Details about the message</p>
    </div>
    <img :src="imageSrc" alt="A sample image" />
    <a :href="link" target="_blank" rel="noopener noreferrer">Open Link</a>
    <input v-model="inputValue" placeholder="Type something" />
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: {
      initialMessage: {
        type: String,
        default: 'Hello, World!'
      },
      imageSrc: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        message: this.initialMessage,
        showDetails: false,
        inputValue: ''
      }
    },
    methods: {
      changeMessage() {
        this.message = 'Message has been changed!'
        this.showDetails = !this.showDetails
      }
    }
  }
</script>

<style scoped>
  .hello-world {
    font-family: Arial, sans-serif;
    text-align: center;
  }

  h1 {
    color: #42b983;
  }

  button {
    margin-top: 10px;
    padding: 5px 10px;
    font-size: 16px;
  }

  img {
    margin-top: 20px;
    max-width: 100%;
    height: auto;
  }

  a {
    color: #42b983;
    text-decoration: none;
  }

  input {
    margin-top: 10px;
    padding: 5px;
  }
</style>
