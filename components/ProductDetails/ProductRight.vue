<template>
  <div class="w-full xl:ms-5 text-gray-800">
    <!-- <div class="flex flex-row justify-end">
          <Share :product="product" :host="host" />
          <WishButton :rounded="true" :pid="product.id" v-if="product.id" class="p-1 w-7 h-7"/>
      </div> -->

    <div class="flex flex-row w-full afterSizeSelector">
      <div v-if="product" class="flex flex-col w-full px-2">
        <strong
          v-if="product.brand"
          class="leading-3 text-lg sm:text-xl mb-1 uppercase"
        >
          {{ product.brand.name }}
        </strong>

        <p class="mb-1.5 sm:mb-3 text-gray-500 text-base sm:text-lg">
          {{ product.name }}

          <!-- <span v-if="product.color">-{{ product.color.name }}</span> -->
        </p>

        <hr class="mb-1.5 sm:mb-3 border-t border-gray-200 w-full" />

        <!-- size chart demo button  -->
        <!-- <div v-if="product.sizechart">
          <button
            aria-label="Open Menu"
            class="
              overflow-x-hidden overflow-y-hidden
              transition
              ease-in-out
            focus:outline-none focus:ring-0 focus:ring-offset-0
 focus:ring-0 focus:ring-offset-0
              duration-1500
            "
            @click="sidebar = !sidebar"
          >
            Size chart
          </button>
          <div
            v-if="sidebar"
            class="
              fixed
              inset-0
              z-30
              w-screen
              h-screen
              bg-black
              opacity-50
              cursor-auto
            "
            @click="sidebar = false"
          />
          <ProductSizeChart
            :product="product"
            class="h-screen"
            :show="sidebar"
            :class="sidebar ? 'openSideBar' : 'closeSideBar'"
            @hideSidebar="sidebar = false"
          />
        </div> -->

        <!-- <span v-if="showDemoScheduler">
              <Scheduler
                :class="showDemoScheduler ? 'open' : 'close'"
                :product="product"
                @hide="hideOffers"
              />
            </span> -->

        <div>
          <div class="mb-1.5 sm:mb-3">
            <div class="flex flex-row my-auto items-baseline mb-1">
              <b class="me-1 text-lg sm:text-lg"></b>

              <b class="me-2 text-base sm:text-xl">
                {{ product.price | currency(store.currencySymbol) }}
              </b>

              <strike
                v-if="product.price < product.mrp"
                class="text-base sm:text-lg font-light me-2 text-gray-500"
              >
                {{ product.mrp | currency(store.currencySymbol) }}
              </strike>

              <div
                v-if="product.discount > 0"
                class="text-base sm:text-lg text-primary-500"
              >
                ({{ product.discount }}% off)
              </div>
            </div>

            <div class="text-sm text-success font-medium">
              inclusive of all taxes
            </div>
          </div>

          <div
            v-if="product.stock > 0 && product.stock < 5"
            class="
              text-sm
              sm:text-base
              font-light
              text-error
              mb-1.5
              sm:mb-3
              animate-pulse
            "
          >
            Hurry up, only few left!
          </div>

          <span class="mb-1.5 sm:mb-3 border-b shadow-sm"></span>
          <!-- <div class="mt-4">
                <span class="avl">Available offers</span>
                <ul class="mt-3 ms-5 subline">
                  <li class="py-2">
                    ratione reiciendis distinctio possimus quis eius.
                  </li>
                  <li class="py-2">Lorem ipsum dolor sit amet consectetur</li>
                  <li class="py-2">adipisicing elit. Aliquam vitae expedita</li>
                  <li class="py-2">facere id ipsa at, eligendi impedit esse</li>
                  <li class="py-2">odit! Porro totam velit iste provident</li>
                </ul>
              </div> -->
          <!-- <span class="mt-4 border-b shadow-sm"></span>-->

          <!-- select options  -->
          <div class="flex-col">
            <!-- <div
                  v-if="product.options && product.options.length"
                  class="items-center p-3 px-3 my-3 text-sm bg-gray-100 sizeSelector lg:my-0"
                  :class="{ 'shake-animation': shake }"
                >
                  <div>
                    <div
                      v-for="o in product.options"
                      :key="o.id"
                      class="flex flex-row my-3"
                    >
                      <span class="my-auto  text-gray-500 me-3">
                        {{ o.name }}
                     </span>
                      <select
                        v-if="o.type == 'select'"
                        @change="$emit('optionChanged', selectedOptions)"
                        v-model="selectedOptions[o.id]"
                      >
                        <option
                          v-for="(i, ix) in o.values"
                          :key="ix"
                          :value="i.name"
                        >
                          {{ i.name }}
                        </option>
                      </select>
                      <div v-else-if="o.type == 'textbox'" class="flex">
                        <div class="text-xs">{{ o.name }}</div>
                        <input
                          type="text"
                          v-model="selectedOptions[o.id]"
                          @blur="$emit('optionChanged', selectedOptions)"
                        />
                      </div>
                      <div v-else-if="o.type == 'date'" class="flex">
                        <input
                          type="date"
                          id="start"
                          @blur="$emit('optionChanged', selectedOptions)"
                          v-model="selectedOptions[o.id]"
                        />
                      </div>
                      <div v-else-if="o.type == 'textarea'" class="flex">
                        <textarea
                          rows="3"
                          @blur="$emit('optionChanged', selectedOptions)"
                          v-model="selectedOptions[o.id]"
                        />
                      </div>
                      <div v-else-if="o.type == 'size'" class="flex flex-wrap">
                        <label
                          v-for="(i, ix) in o.values"
                          :key="ix + 'c'"
                          :class="
                            selectedOptions[o.id] == i.id
                              ? ` border-primary-500 bg-primary-500 text-white`
                              : `bg-gray-100 border-gray-400`
                          "
                          class="flex items-center justify-center w-12 h-12 m-1 text-gray-500 border-2 rounded-full cursor-pointer hover:text-primary-500 hover:border-primary-500 rouned-md       focus:outline-none focus:ring-0 focus:ring-offset-0
 hover:font-bold"
                        >
                          <div class="text-xs uppercase sm:text-sm">
                            {{ i.name }}
                          </div>
                          <input
                            type="radio"
                            :value="i.id"
                            class="hidden"
                            v-model="selectedOptions[o.id]"
                            @change="$emit('optionChanged', selectedOptions)"
                          />
                        </label>
                      </div>
                      <div
                        v-else-if="o.type == 'colors'"
                        class="flex flex-wrap"
                      >
                        <label
                          :class="
                            selectedOptions[o.id] == i.id
                              ? `border-primary-500 text-white`
                              : `border-gray-200 text-black`
                          "
                          :style="
                            selectedOptions[o.id] == i.id
                              ? `background-color:${i.name}`
                              : ``
                          "
                          v-for="(i, ix) in o.values"
                          :key="ix + 'c'"
                          class="flex items-center justify-center w-12 h-12 m-1 border-2 rounded-full cursor-pointer       focus:outline-none focus:ring-0 focus:ring-offset-0
 hover:font-bold"
                        >
                          <div class="text-xs">{{ i.name }}</div>
                          <input
                            type="radio"
                            :value="i.id"
                            class="hidden"
                            v-model="selectedOptions[o.id]"
                            @change="$emit('optionChanged', selectedOptions)"
                          />
                        </label>
                      </div>
                      <div v-else-if="o.type == 'radio'">
                        <label
                          v-for="(v, i) in o.values"
                          :key="i"
                          class="p-3 mx-4"
                        >
                          <input
                            class="my-auto text-primary-500 focus:ring-1 focus:ring-primary-500"
                            type="radio"
                            :name="v.id"
                            v-model="selectedOptions[o.id]"
                            :value="v.id"
                            :id="v.id"
                          />
                          <span class="-mb-2  text-gray-600">{{
                            v.name
                          }}</span>
                        </label>
                      </div>

                      <div v-else-if="o.type == 'checkbox'">
                        <Checkbox
                          @change="$emit('optionChanged', selectedOptions)"
                          :name="v.id"
                          v-model="selectedOptions[o.id]"
                          v-for="(v, i) in o.values"
                          :key="i"
                          :value="v.id"
                          :id="v.id"
                          >{{ v.name }}
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                </div> -->
            <!-- <div
                  class="items-center p-3 px-3 my-3 text-sm bg-gray-100 lg:my-0"
                  :class="{ 'shake-animation': shake }"
                >
                  <div class="flex items-center">
                    <span class="me-4"> SELECT VARIANT</span>
                  </div>
                  <div v-if="product.variants">
                    <div v-for="v in product.variants" :key="v.id">
                      <div class="flex">
                        <button
                          @click="selectVariant(v)"
                          :class="{
                            'bg-primary-500 text-white':
                              v.id ==
                              (userSelectedVariant && userSelectedVariant.id),
                          }"
                          class="items-center justify-center w-12 h-12 m-1 border border-gray-400 rounded-full cursor-pointer       focus:outline-none focus:ring-0 focus:ring-offset-0
 hover:border-secondary-500 hover:font-bold"
                          v-if="v.stock > 0"
                        >
                          <div class="text-xs">{{ v.size }}</div>
                          <div
                            v-if="v.stock < 5"
                            class="absolute w-12 text-xs font-semibold text-white bg-orange-500 rounded"
                          >
                            {{ v.stock }} left
                          </div>
                          <div class="text-xs" v-if="v">
                            {{ v.options[0].name }} {{ v.options[0].val }}
                          </div>
                        </button>
                        <button
                          v-else
                          class="w-12 h-12 m-1 text-gray-600 bg-gray-300 rounded-full cursor-not-allowed       focus:outline-none focus:ring-0 focus:ring-offset-0
"
                        >
                          <div class="text-xs">
                            {{ v.options[0].name }} {{ v.options[0].val }}
                          </div>
                          <div
                            class="absolute w-12 mt-5 text-xs font-semibold text-white rounded bg-secondary-500"
                          >
                            No stock
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div> -->
            <!-- <img
                      class="h-3 -mt-1 ms-6 me-2"
                      alt=""
                      v-lazy="`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzOCIgaGVpZ2h0PSIxMiI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMyODc0RjAiIHN0cm9rZS13aWR0aD0iMS4zIj48cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0zNy4zNS42NUguNjV2MTAuN2gzNi43Vi42NXoiLz48cGF0aCBmaWxsPSIjODc4Nzg3IiBkPSJNNi42NSA4LjY1aDF2Mi43aC0xem00LTNIMTFsLS4zNS0uMzVWNWwtLjE1LjE1LS4xNS0uMTV2LjNsLS4zNS4zNWguMzV2NS43SDEwbC4zNS4zNXYuM2wuMTUtLjE1LjE1LjE1di0uM2wuMzUtLjM1aC0uMzV2LTUuN3ptNSAzSDE2bC0uMzUtLjM1VjhsLS4xNS4xNS0uMTUtLjE1di4zbC0uMzUuMzVoLjM1djIuN0gxNWwuMzUuMzV2LjNsLjE1LS4xNS4xNS4xNXYtLjNsLjM1LS4zNWgtLjM1di0yLjd6bTQtM2gxdjUuN2gtMXptNCAzaDF2Mi43aC0xem05IDBoMXYyLjdoLTF6bS00LTNoMXY1LjdoLTF6Ii8+PC9nPjwvc3ZnPg==?tr=h-12,fo-auto`"
                   
                    /> -->
            <!-- <div class="flex items-center text-primary">
                      <span class="">SIZE CHART</span>
                      <i class="block -mt-1 ms-2 fa fa-angle-right"></i>
                    </div> -->
            <div
              v-if="
                pg &&
                ((pg.colorGroup && pg.colorGroup.length) ||
                  (pg.sizeGroup && pg.sizeGroup.length))
              "
              class="mb-1.5 sm:mb-3 text-sm tracking-wide"
            >
              <div
                v-if="pg.sizeGroup && pg.sizeGroup.length"
                class="mb-1.5 sm:mb-3"
              >
                <div class="flex flex-col">
                  <div class="mb-1.5 sm:mb-3 flex items-center">
                    <h6 class="font-semibold w-36 me-2">SELECT SIZE</h6>

                    <div v-if="product.sizechart">
                      <button
                        aria-label="Open Menu"
                        class="
                          focus:outline-none focus:ring-0 focus:ring-offset-0
                          duration-1500
                          text-primary-500
                          font-semibold
                          flex
                          items-center
                          space-x-1
                        "
                        @click="sidebar = !sidebar"
                      >
                        <span>SIZE CHART</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                      <div
                        v-if="sidebar"
                        class="
                          fixed
                          inset-0
                          z-30
                          w-screen
                          h-screen
                          bg-black
                          opacity-50
                          cursor-auto
                        "
                        @click="sidebar = false"
                      />
                      <ProductSizeChart
                        :product="product"
                        class="h-screen"
                        :show="sidebar"
                        :class="sidebar ? 'openSideBar' : 'closeSideBar'"
                        @hideSidebar="sidebar = false"
                      />
                    </div>
                  </div>

                  <div class="flex flex-row items-center space-x-2">
                    <nuxt-link
                      v-for="(i, ix) in pg.sizeGroup"
                      :key="ix + 's'"
                      :to="`/${i.slug}?id=${i.id}`"
                      :class="getClassesForSizeGroup(i, product)"
                      class="
                        relative
                        text-sm
                        font-medium
                        flex
                        items-center
                        justify-center
                        w-12
                        h-12
                        bg-white
                        border
                        rounded-full
                        cursor-pointer
                        focus:outline-none focus:ring-0 focus:ring-offset-0
                      "
                    >
                      <div v-if="i.stock < 1" class="absolute inset-x-0">
                        <div
                          class="border-t border-gray-400 transform rotate-45"
                        ></div>
                      </div>
                      <div class="uppercase">
                        {{ i.size.name }}
                      </div>
                    </nuxt-link>
                  </div>
                </div>
                <!-- <div
                          @click="sidebar = !sidebar" aria-label="Open Menu"
                          class="my-auto text-sm font-light text-gray-600 underline cursor-pointer ms-2 hover:text-gray-800 hover:font-semibold"
                        >
                          Size chart
                        </div>
                        <div>
                          <div
                            v-if="sidebar"
                            @click="sidebar = false"
                            class="fixed inset-0 z-30 w-screen h-screen bg-black opacity-50 cursor-auto"
                          />
                          <ProductSizeChart
                            class="h-screen"
                            :show="sidebar"
                            :class="sidebar ? 'openSideBar' : 'closeSideBar'"
                            @hideSidebar="sidebar = false"
                          />
                        </div> -->
                <!-- size chart demo button  -->
              </div>

              <div v-if="pg.colorGroup && pg.colorGroup.length">
                <div>
                  <h6 class="mb-1.5 sm:mb-3 font-semibold w-36 me-2">
                    AVAILABLE COLORS
                  </h6>

                  <div class="flex flex-row items-center space-x-2">
                    <nuxt-link
                      v-for="(i, ix) in pg.colorGroup"
                      :key="ix + 'c'"
                      :to="`/${i.slug}?id=${i.id}`"
                      :style="`background: ${i.color.color_code};`"
                      :class="getClassesForColorGroup(i, product)"
                      class="
                        flex
                        items-center
                        justify-center
                        w-12
                        h-12
                        border border-gray-500
                        hover:border-primary-500
                        rounded-full
                        cursor-pointer
                        focus:outline-none focus:ring-0 focus:ring-offset-0
                        tooltip
                      "
                    >
                      <div
                        class="
                          absolute
                          z-50
                          w-auto
                          p-2
                          px-4
                          -mt-24
                          text-sm
                          tracking-wider
                          text-center text-white
                          transition
                          duration-75
                          delay-75
                          transform
                          bg-black
                          rounded-lg
                          shadow-lg
                          tooltiptext
                        "
                      >
                        {{ i.color.name }}
                      </div>
                      <div
                        class="absolute shadow-lg triangle tooltiptext"
                      ></div>
                    </nuxt-link>
                    <!-- {{tooltip22}} -->
                  </div>
                </div>
              </div>
              <!-- <div class="flex items-center">
                    <span class="me-4"> SELECT SIZE</span>
                    
                  </div> -->
              <!-- <div
                    class="relative flex flex-wrap px-3 py-4"
                    :class="{ 'shake-animation': shake }"
                  >
                    <div v-for="v in size" :key="v._id">
                      <button
                        @click="selectVariant(v)"
                        :class="{
                          'bg-primary-500 text-white':
                            v.size ==
                            (userSelectedVariant && userSelectedVariant.size),
                        }"
                        v-if="v.stock > 0"
                        class="w-12 h-12 m-1 border border-gray-400 rounded-full       focus:outline-none focus:ring-0 focus:ring-offset-0
 hover:border-secondary-500 hover:font-bold"
                      >
                        <div class="text-xs">{{ v.size }}</div>
                        <div
                          v-if="v.stock < 5"
                          class="absolute w-12 text-xs font-semibold text-white bg-orange-500 rounded"
                        >
                          {{ v.stock }} left
                        </div>
                      </button>
                      <button
                        v-else
                        class="w-12 h-12 m-1 text-gray-600 bg-gray-300 rounded-full cursor-not-allowed       focus:outline-none focus:ring-0 focus:ring-offset-0
"
                      >
                        <div class="text-xs">{{ v.size }}</div>
                        <div
                          class="absolute w-12 mt-5 text-xs font-semibold text-white rounded bg-secondary-500"
                        >
                          No stock
                        </div>
                      </button>
                    </div>
                  </div> -->
            </div>
          </div>
          <!-- <div class="items-center p-3 px-3 my-3 text-sm bg-gray-100 lg:my-0"
          :class="{ 'shake-animation': shake }">
            <div v-if="product.options">
              <div v-for="o in product.options" :key="o.id"> -->
          <!-- color selector -->
          <!-- </div>
            </div>
              </div> -->

          <div class="flex items-center mb-1.5 sm:mb-3">
            <div
              class="
                flex flex-row
                items-center
                space-x-2
                w-36
                me-2
                font-semibold
                whitespace-nowrap
              "
            >
              <span>AVAILABILITY </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>

            <span
              v-if="product.stock >= 5"
              class="text-sm text-success whitespace-nowrap"
              >In Stock</span
            >

            <span
              v-else-if="product.stock > 0 && product.stock < 5"
              class="text-sm text-primary-500 whitespace-nowrap"
            >
              Only {{ product.stock }} remaining
            </span>

            <span v-else class="text-sm text-error whitespace-nowrap">
              Out of Stock</span
            >
          </div>

          <!-- deleivery  -->
          <div
            class="
              flex flex-col
              justify-between
              w-full
              mb-1
              sm:mb-2 sm:flex-row
            "
          >
            <!-- <div class="me-3">
                  <span class=" font-light text-gray-500">Delivery To:</span>
                  <input
                    type="text"
                    class="h-12 mt-2 border-none ring-1 ring-primary-500 focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter Pin"
                  />
                </div> -->
            <div v-if="product.returnInfo" class="flex">
              <div class="flex flex-wrap items-center">
                <div class="me-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.64 2.35C12.19 0.9 10.2 0 7.99 0C3.57 0 0 3.58 0 8C0 12.42 3.57 16 7.99 16C11.72 16 14.83 13.45 15.72 10H13.64C12.82 12.33 10.6 14 7.99 14C4.68 14 1.99 11.31 1.99 8C1.99 4.69 4.68 2 7.99 2C9.65 2 11.13 2.69 12.21 3.78L8.99 7H15.99V0L13.64 2.35Z"
                      fill="#4A4A4A"
                    />
                  </svg>
                </div>
                <div class="font-light text-gray-500">
                  {{ product.returnInfo }}
                </div>
                <!-- <span class="my-auto  font-light text-gray-500"
                      >Cash on Delivery available</span >-->
              </div>
            </div>
          </div>

          <div class="mb-1.5 sm:mb-3">
            <div class="flex flex-row items-center">
              <div
                class="
                  flex flex-row
                  items-center
                  space-x-2
                  w-36
                  me-2
                  font-semibold
                  whitespace-nowrap
                "
              >
                <span>GET IT BY </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
              </div>

              <span class="text-sm whitespace-nowrap text-gray-500">
                {{ deliveryDate }}
              </span>
            </div>

            <!-- <div
                  class="text-sm font-light text-gray-500 underline cursor-pointer hover:text-gray-800 hover:font-semibold"
                >
                  View Details
                </div> -->
          </div>
          <!-- <span
                v-if="product.color"
                class="hidden pb-5 my-6  font-light text-gray-500 border-b sm:flex xl:my-4"
              >
                Color:
                <span class=" font-light text-gray-700 ms-1 ">
                  {{ product.color.name }}
                </span>
              </span> -->

          <div
            v-if="reviewSummary"
            class="
              border border-gray-200
              p-1
              flex
              items-center
              mb-1.5
              sm:mb-3
              max-w-max
            "
          >
            <div
              class="flex items-center space-x-1 border-r border-gray-200 px-2"
            >
              <h6 class="font-bold">{{ reviewSummary.avg }}</h6>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-primary-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>

            <h6 class="px-2 text-sm font-light text-gray-500">
              {{ reviewSummary.count }}
              ratings and
              {{ reviewSummary.reviews && reviewSummary.reviews.length }}
              reviews
            </h6>
          </div>

          <!-- share and add reviews and wishlist icon  -->

          <div
            v-if="product"
            class="
              text-sm
              sm:text-base
              flex flex-row
              justify-between
              w-full
              mb-1.5
              sm:mb-3
            "
          >
            <nuxt-link
              :to="localePath(`/rate-this-product?id=${product.id}`)"
              class="me-3 text-primary-500 hover:text-primary-700"
            >
              Add a Review
            </nuxt-link>
            <!-- <a
                v-if="settings.liveCommerce"
                :href="`${NETEASE_WWW}/netease?channelName=${product.id}`"
                target="blank"
              >
                Schedule a demo
              </a> -->
            <button
              v-if="settings.liveCommerce"
              type="button"
              @click="populateDemoScheduler(product)"
            >
              Schedule a demo
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedProduct && showDemoScheduler" class="container mx-auto">
      <DemoRequestModal
        :show="showDemoScheduler"
        :product="selectedProduct"
        @close="showDemoScheduler = false"
      />
    </div>

    <hr class="mb-1.5 sm:mb-3 border-t border-gray-200 w-full" />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import REVIEWS from '~/gql/review/reviewSummary.gql'
// import { NETEASE_WWW } from '~/shared/config'
import DemoRequestModal from '~/components/ProductDetails/DemoRequestModal.vue'
import NuxtLink from '~/components/NuxtLink.vue'

// import Share from '~/components/ProductDetails/Share'
// import { Checkbox } from '~/shared/components/ui'
// import WishButton from '~/components/WishButton.vue'
import ProductSizeChart from '~/components/ProductDetails/ProductSizeChart'
export default {
  components: { DemoRequestModal, NuxtLink, ProductSizeChart },
  props: {
    host: { type: String, default: null },
    pg: { type: Object, default: null },
    product: { type: Object, default: null },
    reviewSummary: { type: Object, default: null },
    // loading: { type: Boolean },
  },
  data() {
    return {
      selectedProduct: {},
      showDemoScheduler: false,
      sidebar: false,
      selectedRadio: null,
      // reviewSummary: null,
      selectedOptions: {},
      select: null,
      deliveryDate: null,
      shake: false,
      userSelectedVariant: null,
      addedToCart: false,
      showScheduleDemoPopup: false,
      // NETEASE_WWW,
    }
  },
  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      getItemQty: 'cart/getItemQty',
      settings: 'settings',
      store: 'store',
    }),
    // discount() {
    //   return Math.floor(100 - (this.product.price * 100) / this.product.mrp)
    // },
  },
  async created() {
    // await this.getReviews()
    await this.updatedDeliveryDates()
    if (this.product.options) {
      this.product.options.forEach((o) => {
        if (o.type === 'checkbox') {
          this.selectedOptions[o.name] = []
          if (o.default_option) {
            this.selectedOptions[o.name].push(o.default_option)
          }
        } else {
          this.selectedOptions[o.name] = null
          this.selectedOptions[o.name] = o.default_option
        }
        // console.log(this.product,this.selectedOptions)
      })
    }
  },
  mounted() {
    // console.log(this.product, 'product details')
  },
  // components: {
  // Share,
  // Checkbox,
  // WishButton,
  // ProductSizeChart,
  // },
  methods: {
    getClassesForSizeGroup(i, product) {
      let classes = ''
      if (i.stock < 1) classes = 'border-gray-400 text-gray-400 bg-gray-300'
      else if (i.id === product.id)
        classes = 'border-primary-500 text-primary-500 bg-white'
      else
        classes =
          'border-gray-500 text-gray-700 hover:border-primary-500 bg-white'
      return classes
    },
    getClassesForColorGroup(i, product) {
      let classes = ''
      if (i.stock < 1) classes = 'border-gray-100 text-gray-400'
      else if (i.id === product.id)
        classes = 'border-primary-500 bg-primary-500'
      else classes = 'border-gray-500 hover:border-primary-500'
      return classes
    },
    populateDemoScheduler(p) {
      this.selectedProduct = { id: p.id, name: p.name }
      this.showDemoScheduler = true
    },
    // async getReviews() {
    //   const pid = this.$route.query.id
    //   if (!pid) return
    //   try {
    //     this.reviewSummary = await this.$get('review/reviewSummary', { pid })
    //     // this.reviewSummary = (
    //     //   await this.$apollo.query({
    //     //     query: REVIEWS,
    //     //     variables: { pid },
    //     //     fetchPolicy: 'no-cache',
    //     //   })
    //     // ).data.reviewSummary
    //   } catch (e) {}
    // },
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    ...mapActions({ addToCart: 'cart/addToCart' }),
    alertToSelectMandatoryOptions() {
      // Raised by AddToCart Button at detail page
      this.setErr('Please select a size')
      if (process.client) {
        const el = this.$el.getElementsByClassName('sizeSelector')[0]
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
      this.shake = true
      setTimeout(() => {
        this.shake = false
      }, 3000)
    },
    selectVariant(s) {
      this.updatedDeliveryDates()
      this.userSelectedVariant = s
      this.$emit('variantChanged', s)
      this.selectedImgIndex = 0
    },
    updatedDeliveryDates() {
      const now = new Date()
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      now.setDate(now.getDate() + 5)
      this.deliveryDate =
        now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear()
    },
    pushToLogin() {
      const query = this.$route.query
      let route = this.$route.path
      route = route.substr(1)
      if (!query || !query.id) this.$router.push(`/login?return=${route}`)
      else this.$router.push(`/login?return=${route}?id=${query.id}&wish=true`)
    },
    go(url) {
      this.$router.push(url)
    },
    findVariation() {
      // const pid = this.product.id
      // const obj = this.selectedOptions
      // const options = Object.keys(obj).map(function (key) {
      //   return { name: key, val: obj[key] }
      // })
      // console.log('options', options)
      try {
        this.clearErr()
        // const variant = (
        //   await this.$apollo.query({
        //     query: GET_VARIANT,
        //     variables: { pid, options },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.getVariant
        // this.selectedVariant = variant
      } catch (e) {
        this.setErr(e)
      } finally {
        this.busy(false)
      }
    },

    error(err) {
      this.setErr(err.err)
    },
    clearRecentItems() {
      this.RecentlyViewedProducts = []
    },
    // async getProduct() {
    //   this.loading = true
    //   try {
    //     this.product = (
    //       await this.$apollo.query({
    //         query: PRODUCT,
    //         variables: { id: this.$route.query.id },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.product
    //     this.updatedDeliveryDates()
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //     this.loading = false
    //   }
    // },
  },
}
</script>

<style scoped>
.openSideBar {
  right: 0;
  transition: 0.3s all;
}
.closeSideBar {
  right: -100%;
  transition: 0.3s all;
}
.lh75 {
  line-height: 1.1;
}
.custom-arrow {
  margin-right: -14px;
  height: 80px;
  width: 46px;
  padding: 6px;
  padding-top: 23px;
  box-shadow: 10px;
}
.slick-prev::before,
.slick-next::before {
  font-size: 35px;
  line-height: 1;
  opacity: 1;
  color: #ba8638;
  box-shadow: 10px;
  -webkit-font-smoothing: antialiased;
}
.slick-prev {
  margin-left: -40px;
  z-index: 1;
  left: 0;
  box-shadow: 10px;
}
.triangle {
  margin-top: -52px;
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0 10px;
  border-color: black transparent transparent transparent;
}
.tooltip .tooltiptext {
  visibility: hidden;
  transition: opacity 5s;
}
.tooltip:hover .tooltiptext {
  border-radius: 3px;
  visibility: visible;
}
.shake-animation {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  border: 1px solid red;
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
