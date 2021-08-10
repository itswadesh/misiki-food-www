<template>
  <div>
    <form class="text-sm text-primary-500">
      <div class="flex flex-col">
        <label for="cnumber" class="my-2">Card Number</label>
        <input
          id="cardnumber"
          type="text"
          name="cardnumber"
          placeholder="Enter card number"
          class="
            w-full
            h-10
            px-2
            text-sm text-gray-600
            border border-gray-400
            rounded
            shadow
            focus:outline-none focus:ring-offset-gray-200
          "
        />
      </div>
      <div class="flex flex-row justify-between w-full my-4">
        <!-- months -->
        <div class="flex flex-col w-1/4 md:w-1/3">
          <label for="month" class="my-2">Expiry Date</label>
          <select
            name="month"
            required
            tabindex="4"
            class="
              h-10
              px-2
              text-sm text-gray-600
              border border-gray-400
              rounded
              shadow
              focus:outline-none focus:ring-offset-gray-200
            "
          >
            <option value="Month" selected disabled>Month</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
        <!-- year -->
        <div class="flex flex-col w-1/4 md:w-1/3 md:mx-4">
          <label for="year" class="my-2">Expire Date</label>
          <select
            name="year"
            required
            tabindex="4"
            class="
              h-10
              px-2
              text-sm text-gray-600
              border border-gray-400
              rounded
              shadow
              focus:outline-none focus:ring-offset-gray-200
            "
          >
            <option value="Year" selected disabled>Year</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
            <option value="32">32</option>
            <option value="33">33</option>
            <option value="34">34</option>
            <option value="35">35</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            <option value="45">45</option>
            <option value="46">46</option>
            <option value="47">47</option>
            <option value="48">48</option>
            <option value="49">49</option>
            <option value="50">50</option>
            <option value="51">51</option>
            <option value="52">52</option>
            <option value="53">53</option>
            <option value="54">54</option>
            <option value="55">55</option>
            <option value="56">56</option>
            <option value="57">57</option>
            <option value="58">58</option>
            <option value="59">59</option>
          </select>
        </div>
        <!-- cvv -->
        <div class="flex flex-col w-2/5 md:w-1/3">
          <label for="cvv" class="my-2">Security Code(CVV)</label>
          <div class="flex flex-row">
            <input
              id="cvv"
              type="text"
              name="cvv"
              placeholder="Three Digit"
              class="
                w-full
                h-10
                px-2
                text-sm text-gray-600
                border border-gray-400
                rounded
                shadow
                focus:outline-none focus:ring-offset-gray-200
              "
            />
            <svg
              class="my-auto text-gray-600 ms-1 w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <!-- <div class="items-center w-6 h-6 my-auto mt-8 text-center border border-gray-600 rounded-full">?</div> -->
      </div>

      <!-- <input type="submit" value="Submit"> -->
    </form>
  </div>
</template>
